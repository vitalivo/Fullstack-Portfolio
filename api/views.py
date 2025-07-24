# api/views.py
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from projects.models import Project
from certifications.models import Certificate
from contact.models import ContactMessage
from blog.models import BlogPost
from .models import Profile, Technology, Skill

from api.serializers import (
    ProjectSerializer,
    CertificateSerializer,
    ContactMessageSerializer,
    BlogPostSerializer,
    ProfileSerializer,
    TechnologySerializer
)

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.prefetch_related('translations', 'skills__technology')
    serializer_class = ProfileSerializer

class TechnologyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['name', 'category']
    ordering = ['category', 'name']

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.prefetch_related('translations', 'technologies')
    serializer_class = ProjectSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'order']
    ordering = ['order', '-created_at']
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Получить избранные проекты для главной страницы"""
        featured = self.queryset.filter(is_featured=True)[:3]
        serializer = self.get_serializer(featured, many=True)
        return Response(serializer.data)

class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    filter_backends = [filters.OrderingFilter]
    ordering = ['-date_issued']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering = ['-created_at']
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Message sent successfully'}, 
                          status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content']
    ordering = ['-created_at']
