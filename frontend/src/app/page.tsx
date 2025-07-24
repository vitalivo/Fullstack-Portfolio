// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { profileAPI, Profile } from '@/lib/api';

export default function Home() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileAPI.getProfile();
        if (response.data.length > 0) {
          setProfile(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Profile not found</div>
      </div>
    );
  }

  const currentTranslation = profile.translations.find(t => t.language === 'en') || profile.translations[0];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-xl mb-6 opacity-90">
            {currentTranslation?.title || 'Fullstack Developer'}
          </p>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-80">
            {currentTranslation?.short_bio || 'Passionate about creating amazing web applications'}
          </p>
          <div className="flex justify-center space-x-4">
            {profile.github_url && (
              <a 
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                GitHub
              </a>
            )}
            {profile.linkedin_url && (
              <a 
                href={profile.linkedin_url}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profile.skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">{skill.technology.name}</h3>
                <p className="text-gray-600 mb-2">Level: {skill.level}</p>
                <p className="text-gray-600">Experience: {skill.years_experience} years</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            I'm always open to discussing new opportunities
          </p>
          <div className="flex justify-center space-x-8">
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-gray-600">{profile.email}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-gray-600">{profile.location}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
