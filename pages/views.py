# pages/views.py

from django.shortcuts import render
from django.utils.translation import gettext as _

def home_view(request):
    return render(request, 'pages/home.html')

def about_view(request):
    return render(request, 'pages/about.html')

def contact_view(request):
    return render(request, 'pages/contact.html')

def resume_view(request):
    return render(request, 'pages/resume.html')