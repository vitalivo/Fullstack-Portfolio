# Добавить в portfolio/views.py
# Добавить в конец файла backend/portfolio/views.py

from django.http import HttpResponse, Http404
from django.template.loader import render_to_string
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import io

# Для PDF генерации (установи: pip install reportlab)
try:
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import letter, A4
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
    from reportlab.lib.units import inch
    from reportlab.lib import colors
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False

@api_view(['GET'])
def resume_templates(request):
    """Получить все активные шаблоны резюме"""
    from .models import ResumeTemplate
    
    templates = ResumeTemplate.objects.filter(is_active=True).prefetch_related('sections')
    
    data = []
    for template in templates:
        sections = []
        for section in template.sections.filter(is_visible=True):
            sections.append({
                'type': section.section_type,
                'title': section.title,
                'content': section.content,
                'order': section.order
            })
        
        data.append({
            'id': template.id,
            'name': template.name,
            'position': template.position,
            'position_display': template.get_position_display(),
            'description': template.description,
            'sections': sections
        })
    
    return Response(data)

@api_view(['GET'])
def resume_detail(request, template_id):
    """Получить детали конкретного резюме"""
    from .models import ResumeTemplate
    
    try:
        template = ResumeTemplate.objects.get(id=template_id, is_active=True)
    except ResumeTemplate.DoesNotExist:
        return Response({'error': 'Resume template not found'}, status=404)
    
    sections = []
    for section in template.sections.filter(is_visible=True):
        sections.append({
            'type': section.section_type,
            'title': section.title,
            'content': section.content,
            'order': section.order
        })
    
    data = {
        'id': template.id,
        'name': template.name,
        'position': template.position,
        'position_display': template.get_position_display(),
        'description': template.description,
        'sections': sections
    }
    
    return Response(data)

@api_view(['GET'])
def download_resume_pdf(request, template_id):
    """Скачать резюме в формате PDF"""
    from .models import ResumeTemplate, ResumeDownload
    
    if not REPORTLAB_AVAILABLE:
        return Response({'error': 'PDF generation not available. Install reportlab.'}, status=500)
    
    try:
        template = ResumeTemplate.objects.get(id=template_id, is_active=True)
    except ResumeTemplate.DoesNotExist:
        raise Http404("Resume template not found")
    
    # Создаем простой PDF (пока без сложного форматирования)
    buffer = io.BytesIO()
    p = canvas.Canvas(buffer, pagesize=A4)
    
    # Заголовок
    p.setFont("Helvetica-Bold", 24)
    p.drawString(100, 750, "Vitaliy Voloshin")
    
    p.setFont("Helvetica", 16)
    p.drawString(100, 720, template.get_position_display())
    
    # Контактная информация
    p.setFont("Helvetica", 12)
    y_position = 680
    p.drawString(100, y_position, "Email: vitaliy.voloshin@example.com")
    p.drawString(100, y_position - 20, "Location: Israel")
    p.drawString(100, y_position - 40, "GitHub: github.com/vitaliyvoloshin")
    
    # Секции резюме
    y_position = 600
    for section in template.sections.filter(is_visible=True):
        if y_position < 100:  # Новая страница если места мало
            p.showPage()
            y_position = 750
        
        p.setFont("Helvetica-Bold", 14)
        p.drawString(100, y_position, section.title)
        y_position -= 20
        
        p.setFont("Helvetica", 10)
        # Простое разбиение текста на строки
        lines = section.content.split('\n')
        for line in lines:
            if y_position < 50:
                p.showPage()
                y_position = 750
            p.drawString(100, y_position, line[:80])  # Ограничиваем длину строки
            y_position -= 15
        
        y_position -= 10
    
    p.save()
    
    # Сохраняем статистику
    ResumeDownload.objects.create(
        template=template,
        ip_address=request.META.get('REMOTE_ADDR', '127.0.0.1'),
        user_agent=request.META.get('HTTP_USER_AGENT', '')
    )
    
    buffer.seek(0)
    response = HttpResponse(buffer, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="Vitaliy_Voloshin_{template.position}_Resume.pdf"'
    
    return response