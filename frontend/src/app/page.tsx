
'use client';

import { useEffect, useState } from 'react';
import { profileAPI, Profile } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

// Функция для получения цвета по категории
const getCategoryColor = (category: string) => {
  const colors = {
    backend: 'from-green-400 to-green-600',
    frontend: 'from-blue-400 to-blue-600', 
    database: 'from-purple-400 to-purple-600',
    devops: 'from-orange-400 to-orange-600',
    mobile: 'from-pink-400 to-pink-600',
    other: 'from-gray-400 to-gray-600'
  };
  return colors[category as keyof typeof colors] || colors.other;
};

// Функция для получения цвета уровня
const getLevelColor = (level: string) => {
  const colors = {
    beginner: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    intermediate: 'bg-blue-100 text-blue-800 border-blue-200',
    advanced: 'bg-green-100 text-green-800 border-green-200',
    expert: 'bg-purple-100 text-purple-800 border-purple-200'
  };
  return colors[level as keyof typeof colors] || colors.beginner;
};

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileResponse = await profileAPI.getProfile();
        
        if (profileResponse.data.length > 0) {
          setProfile(profileResponse.data[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t.common?.loading || 'Loading...'}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{t.common?.error || 'Profile not found'}</div>
      </div>
    );
  }

  const currentTranslation = profile.translations.find(tr => tr.language === 'en') || profile.translations[0];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-xl mb-6 opacity-90">
            {currentTranslation?.title || t.home.hero.title}
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-80">
            {currentTranslation?.short_bio || t.home.hero.subtitle}
          </p>
          <div className="flex justify-center space-x-4">
            {profile.github_url && (
              <a 
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {t.home.hero.github}
              </a>
            )}
            {profile.linkedin_url && (
              <a 
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                {t.home.hero.linkedin}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t.home.skills.title}
            </h2>
            <p className="text-xl text-gray-600">{t.home.skills.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${getCategoryColor(skill.technology.category)}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{skill.technology.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getLevelColor(skill.level)}`}>
                      {skill.level.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">{t.home.skills.category}:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(skill.technology.category)} text-white`}>
                      {skill.technology.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-600">{t.home.skills.experience}:</span>
                    <span className="text-lg font-bold text-blue-600">{skill.years_experience} {t.home.skills.years}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(skill.technology.category)} transition-all duration-500`}
                      style={{ 
                        width: skill.level === 'expert' ? '100%' : 
                               skill.level === 'advanced' ? '80%' : 
                               skill.level === 'intermediate' ? '60%' : '40%' 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Explore My Work
            </h2>
            <p className="text-xl text-gray-600">Discover more about my experience and projects</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/projects" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="text-4xl mb-4">💻</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Projects</h3>
                <p className="text-gray-600 mb-4">Check out my latest web applications and development work</p>
                <div className="text-blue-600 font-semibold group-hover:text-blue-800">View Projects →</div>
              </div>
            </Link>

            <Link href="/certificates" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">Certificates</h3>
                <p className="text-gray-600 mb-4">My professional certifications and educational achievements</p>
                <div className="text-green-600 font-semibold group-hover:text-green-800">View Certificates →</div>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="text-4xl mb-4">👨‍💻</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">About Me</h3>
                <p className="text-gray-600 mb-4">Learn more about my background, experience, and journey</p>
                <div className="text-purple-600 font-semibold group-hover:text-purple-800">Learn More →</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl mb-8 opacity-90">
            I am always open to discussing new opportunities and interesting projects
          </p>
          <div className="flex justify-center space-x-8 mb-8">
            <div>
              <p className="font-semibold">Email</p>
              <p className="opacity-90">{profile.email}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="opacity-90">{profile.location}</p>
            </div>
          </div>
          <Link 
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
