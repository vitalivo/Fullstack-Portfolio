# portfolio/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Только Resume URLs (остальные API в api/urls.py)
    path('api/resume/templates/', views.resume_templates, name='resume-templates'),
    path('api/resume/<int:template_id>/', views.resume_detail, name='resume-detail'),
    path('api/resume/<int:template_id>/download/', views.download_resume_pdf, name='download-resume'),
]