# projects/admin.py
from django.contrib import admin
from .models import Project, ProjectTranslation

class ProjectTranslationInline(admin.TabularInline):
    model = ProjectTranslation
    extra = 3  # Для 3 языков
    max_num = 3

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'is_featured', 'order', 'created_at']
    list_filter = ['is_featured', 'created_at', 'technologies']
    search_fields = ['title', 'description']
    filter_horizontal = ['technologies']
    readonly_fields = ['created_at']
    inlines = [ProjectTranslationInline]
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'description', 'image')
        }),
        ('Ссылки', {
            'fields': ('github_link', 'demo_link')
        }),
        ('Настройки', {
            'fields': ('technologies', 'is_featured', 'order')
        }),
        ('Системная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        })
    )

@admin.register(ProjectTranslation)
class ProjectTranslationAdmin(admin.ModelAdmin):
    list_display = ['project', 'language', 'title']
    list_filter = ['language']
    search_fields = ['title', 'description']
