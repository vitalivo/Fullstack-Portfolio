# api/serializers.py
from rest_framework import serializers
from projects.models import Project, ProjectTranslation
from certifications.models import Certificate
from contact.models import ContactMessage
from blog.models import BlogPost
from .models import Profile, ProfileTranslation, Technology, Skill, Experience

class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = '__all__'

class ProfileTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfileTranslation
        fields = ['language', 'title', 'bio', 'short_bio']

class SkillSerializer(serializers.ModelSerializer):
    technology = TechnologySerializer(read_only=True)
    
    class Meta:
        model = Skill
        fields = ['technology', 'level', 'years_experience']

class ProfileSerializer(serializers.ModelSerializer):
    translations = ProfileTranslationSerializer(many=True, read_only=True)
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Profile
        fields = '__all__'

class ProjectTranslationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectTranslation
        fields = ['language', 'title', 'description', 'short_description']

class ProjectSerializer(serializers.ModelSerializer):
    translations = ProjectTranslationSerializer(many=True, read_only=True)
    technologies = TechnologySerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = '__all__'
