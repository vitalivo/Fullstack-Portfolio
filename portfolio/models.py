from django.db import models

# Добавить в конец файла backend/portfolio/models.py

class ResumeTemplate(models.Model):
    """Шаблоны резюме для разных позиций"""
    POSITION_CHOICES = [
        ('fullstack', 'Full Stack Developer'),
        ('frontend', 'Frontend Developer'),
        ('backend', 'Backend Developer'),
        ('python', 'Python Developer'),
        ('react', 'React Developer'),
    ]
    
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.get_position_display()}"

class ResumeSection(models.Model):
    """Секции резюме (опыт, образование, навыки и т.д.)"""
    SECTION_TYPES = [
        ('experience', 'Work Experience'),
        ('education', 'Education'),
        ('skills', 'Technical Skills'),
        ('projects', 'Key Projects'),
        ('certifications', 'Certifications'),
        ('languages', 'Languages'),
        ('achievements', 'Achievements'),
    ]
    
    template = models.ForeignKey(ResumeTemplate, on_delete=models.CASCADE, related_name='sections')
    section_type = models.CharField(max_length=20, choices=SECTION_TYPES)
    title = models.CharField(max_length=100)
    content = models.TextField()
    order = models.IntegerField(default=0)
    is_visible = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.template.name} - {self.title}"

class CoverLetterTemplate(models.Model):
    """Шаблоны сопроводительных писем"""
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=200)
    content = models.TextField(help_text="Используйте {company_name}, {position}, {your_name} для подстановки")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class ResumeDownload(models.Model):
    """Статистика скачиваний резюме"""
    template = models.ForeignKey(ResumeTemplate, on_delete=models.CASCADE)
    downloaded_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField()
    user_agent = models.TextField(blank=True)
    
    def __str__(self):
        return f"{self.template.name} - {self.downloaded_at}"
