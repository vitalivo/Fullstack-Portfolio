# api/profile_models.py
from django.db import models

class Profile(models.Model):
    # Основные данные
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=100)
    avatar = models.ImageField(upload_to='profile/', blank=True)
    resume_file = models.FileField(upload_to='resume/', blank=True)
    
    # Социальные сети
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    telegram_url = models.URLField(blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    
    class Meta:
        verbose_name = "Профиль"
        verbose_name_plural = "Профили"

class ProfileTranslation(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ru', 'Русский'), 
        ('he', 'עברית')
    ]
    
    profile = models.ForeignKey(Profile, related_name='translations', on_delete=models.CASCADE)
    language = models.CharField(max_length=2, choices=[('en', 'English'), ('ru', 'Русский'), ('he', 'עברית')])
    title = models.CharField(max_length=200)  # "Senior Python Developer"
    bio = models.TextField()
    short_bio = models.CharField(max_length=255)
    
    class Meta:
        unique_together = ('profile', 'language')
        verbose_name = "Перевод профиля"
        verbose_name_plural = "Переводы профилей"
    
    def __str__(self):
        return f"{self.profile} - {self.get_language_display()}"

class Technology(models.Model):
    name = models.CharField(max_length=50, unique=True)
    category = models.CharField(max_length=50)  # Backend, Frontend, Database, etc.
    icon = models.CharField(max_length=50, blank=True)  # CSS class или URL иконки
    
    def __str__(self):
        return f"{self.name} [{self.category}]"
    
    class Meta:
        verbose_name = "Технология"
        verbose_name_plural = "Технологии"
        ordering = ['category', 'name']
    
class Skill(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'), 
        ('advanced', 'Advanced'),
        ('expert', 'Expert')
    ]
    
    profile = models.ForeignKey(Profile, related_name='skills', on_delete=models.CASCADE)
    technology = models.ForeignKey(Technology, on_delete=models.CASCADE)
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    years_experience = models.PositiveIntegerField()
    
    def __str__(self):
        return f"{self.technology.name} - {self.get_level_display()} ({self.years_experience} лет)"
    
    class Meta:
        unique_together = ('profile', 'technology')
        verbose_name = "Навык"
        verbose_name_plural = "Навыки"
        ordering = ['technology__category', 'technology__name']
    
    

class Experience(models.Model):
    profile = models.ForeignKey(Profile, related_name='experience', on_delete=models.CASCADE)
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)  # None = current job
    location = models.CharField(max_length=100)
    is_current = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.position} в {self.company}"
    
    class Meta:
        ordering = ['-start_date']
        verbose_name = "Опыт работы"
        verbose_name_plural = "Опыт работы"

class ExperienceTranslation(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('ru', 'Русский'), 
        ('he', 'עברית')
    ]
    experience = models.ForeignKey(Experience, related_name='translations', on_delete=models.CASCADE)
    language = models.CharField(max_length=2, choices=[('en', 'English'), ('ru', 'Русский'), ('he', 'עברית')])
    description = models.TextField()
    achievements = models.TextField(blank=True)
    
    class Meta:
        unique_together = ('experience', 'language')
        verbose_name = "Перевод опыта"
        verbose_name_plural = "Переводы опыта"
    
    def __str__(self):
        return f"{self.experience} - {self.get_language_display()}"