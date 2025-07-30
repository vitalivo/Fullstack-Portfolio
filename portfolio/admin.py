from django.contrib import admin

# Добавить в конец файла backend/portfolio/admin.py
from .models import (
    ResumeTemplate, ResumeSection, CoverLetterTemplate, ResumeDownload
)

@admin.register(ResumeTemplate)
class ResumeTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'position', 'is_active', 'created_at']
    list_filter = ['position', 'is_active']
    search_fields = ['name', 'description']

class ResumeSectionInline(admin.TabularInline):
    model = ResumeSection
    extra = 1
    ordering = ['order']

@admin.register(ResumeSection)
class ResumeSectionAdmin(admin.ModelAdmin):
    list_display = ['template', 'title', 'section_type', 'order', 'is_visible']
    list_filter = ['section_type', 'is_visible']
    search_fields = ['title', 'content']

@admin.register(CoverLetterTemplate)
class CoverLetterTemplateAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active']
    search_fields = ['name', 'subject']

@admin.register(ResumeDownload)
class ResumeDownloadAdmin(admin.ModelAdmin):
    list_display = ['template', 'downloaded_at', 'ip_address']
    list_filter = ['downloaded_at', 'template']
    readonly_fields = ['downloaded_at', 'ip_address', 'user_agent']
