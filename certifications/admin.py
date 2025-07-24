# certifications/admin.py

from django.contrib import admin
from .models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['title', 'issuer', 'date_issued']
    list_filter = ['issuer', 'date_issued']
    search_fields = ['title', 'issuer']
    date_hierarchy = 'date_issued'
    
    fieldsets = (
        ('Информация о сертификате', {
            'fields': ('title', 'issuer', 'date_issued', 'image', 'link')
        }),
    )
