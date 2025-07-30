# contact/models.py

from django.db import models
from django.utils import timezone

class ContactMessage(models.Model):
    """Сообщения с контактной формы"""
    name = models.CharField(max_length=100, verbose_name="Имя")
    email = models.EmailField(verbose_name="Email")
    subject = models.CharField(max_length=200, verbose_name="Тема")
    message = models.TextField(verbose_name="Сообщение")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Дата создания")
    is_read = models.BooleanField(default=False, verbose_name="Прочитано")
    ip_address = models.GenericIPAddressField(null=True, blank=True, verbose_name="IP адрес")
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Сообщение"
        verbose_name_plural = "Сообщения"
    
    def __str__(self):
        return f"{self.name} - {self.subject}"