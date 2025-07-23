# api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    CertificateViewSet,
    ContactMessageViewSet,
    BlogPostViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'certifications', CertificateViewSet)
router.register(r'contact', ContactMessageViewSet)
router.register(r'blog', BlogPostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]