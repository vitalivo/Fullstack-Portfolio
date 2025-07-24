# blog/admin.py

from django.contrib import admin
from .models import BlogPost

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at', 'updated_at']
    list_filter = ['created_at', 'updated_at']
    search_fields = ['title', 'content', 'preview']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'preview', 'content', 'image')
        }),
        ('Системная информация', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
