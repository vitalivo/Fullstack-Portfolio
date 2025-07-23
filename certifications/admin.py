# certifications/admin.py

from django.contrib import admin
from .models import Certificate

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('title', 'issuer', 'date_issued')
    list_filter = ('issuer', 'date_issued')
    search_fields = ('title', 'issuer')