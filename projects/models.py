# projects/models.py
from django.db import models

class Project(models.Model):
    # Основные поля (обязательные)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Дополнительные поля
    github_link = models.URLField(blank=True)
    demo_link = models.URLField(blank=True)
    technologies = models.ManyToManyField('api.Technology', blank=True)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order', '-created_at']

class ProjectTranslation(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ru', 'Русский'), 
        ('he', 'עברית')
    ]
    
    project = models.ForeignKey(Project, related_name='translations', on_delete=models.CASCADE)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES)
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=255)
    
    class Meta:
        unique_together = ('project', 'language')
    
    def __str__(self):
        return f"{self.project.title} - {self.language}"
