from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Создаем роутер для DRF ViewSets
router = DefaultRouter()
router.register(r'profile', views.ProfileViewSet, basename='profile')
router.register(r'projects', views.ProjectViewSet, basename='project')
router.register(r'technologies', views.TechnologyViewSet, basename='technology')
router.register(r'certifications', views.CertificateViewSet, basename='certificate')
router.register(r'blog', views.BlogPostViewSet, basename='blogpost')
router.register(r'contact', views.ContactMessageViewSet, basename='contactmessage')

urlpatterns = [
    # DRF роутер
    path('', include(router.urls)),
    
    # Пока уберем проблемные URL, добавим их позже
    # path('resume/templates/', views.resume_templates, name='resume-templates'),
    # path('resume/<int:template_id>/', views.resume_detail, name='resume-detail'),
    # path('resume/<int:template_id>/download/', views.download_resume_pdf, name='download-resume'),
    # path('cover-letters/', views.cover_letter_templates, name='cover-letter-templates'),
    # path('cover-letters/generate/', views.generate_cover_letter, name='generate-cover-letter'),
]
