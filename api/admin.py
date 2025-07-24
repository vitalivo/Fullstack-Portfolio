from django.contrib import admin
from .models import Profile, ProfileTranslation, Technology, Skill, Experience, ExperienceTranslation

class ProfileTranslationInline(admin.TabularInline):
    model = ProfileTranslation
    extra = 0
    max_num = 3
    fields = ['language', 'title', 'short_bio', 'bio']

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'email', 'location']
    search_fields = ['first_name', 'last_name', 'email']
    inlines = [ProfileTranslationInline]
    

@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    list_display = ['name', 'category']
    list_filter = ['category']
    search_fields = ['name']  # Это нужно для autocomplete_fields
    ordering = ['category', 'name']

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['profile', 'technology', 'level', 'years_experience']
    list_filter = ['level', 'technology__category']
    search_fields = ['technology__name', 'profile__first_name', 'profile__last_name']

    def get_profile_name(self, obj):
        return str(obj.profile)
    get_profile_name.short_description = 'Профиль'
    
    def get_technology_name(self, obj):
        return str(obj.technology)
    get_technology_name.short_description = 'Технология'

class ExperienceTranslationInline(admin.TabularInline):
    model = ExperienceTranslation
    extra = 0
    max_num = 3

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['profile', 'position', 'company', 'start_date', 'is_current']
    list_filter = ['is_current', 'start_date']
    search_fields = ['position', 'company', 'profile__first_name', 'profile__last_name']
    inlines = [ExperienceTranslationInline]
    
    def get_profile_name(self, obj):
        return str(obj.profile)
    get_profile_name.short_description = 'Профиль'
