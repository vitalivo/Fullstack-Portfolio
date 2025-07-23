# api/views.py

from rest_framework import viewsets
from projects.models import Project
from certifications.models import Certificate
from contact.models import ContactMessage
from blog.models import BlogPost
from api.serializers import (
    ProjectSerializer,
    CertificateSerializer,
    ContactMessageSerializer,
    BlogPostSerializer
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer