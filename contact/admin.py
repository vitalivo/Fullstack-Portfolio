# contact/admin.py

from django.contrib import admin
from .models import ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Информация о сообщении', {
            'fields': ('name', 'email', 'subject', 'message')
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        })
    )
