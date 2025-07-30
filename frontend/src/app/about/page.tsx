"use client"

import { useEffect, useState } from "react"
import { api, type Profile } from "@/lib/api"
import { useLanguage } from "@/contexts/LanguageContext"

export default function AboutPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const { t, language } = useLanguage()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.profile.getProfile()
        if (response.data.length > 0) {
          setProfile(response.data[0])
        }
      } catch (error) {
        console.error("Error fetching profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  // Функция для получения перевода профиля
  const getProfileTranslation = (profile: Profile) => {
    if (!profile) return null

    // Ищем перевод для текущего языка
    let translation = profile.translations.find((tr) => tr.language === language)

    // Если нет перевода для текущего языка, используем английский как fallback
    if (!translation) {
      translation = profile.translations.find((tr) => tr.language === "en")
    }

    // Если и английского нет, используем первый доступный
    if (!translation && profile.translations.length > 0) {
      translation = profile.translations[0]
    }

    return translation
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">{t.common.loading}</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">{t.common.error}</div>
      </div>
    )
  }

  const profileTranslation = getProfileTranslation(profile)

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {t.about.title}
          </h1>
          <p className="text-xl text-gray-600">{t.about.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center sticky top-8">
              {profile.avatar ? (
                <img
                  src={
                    profile.avatar.startsWith("http") ? profile.avatar : `http://127.0.0.1:8000/media/${profile.avatar}`
                  }
                  alt={`${profile.first_name} ${profile.last_name}`}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-blue-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
                  {profile.first_name[0]}
                  {profile.last_name[0]}
                </div>
              )}

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {profile.first_name} {profile.last_name}
              </h2>
              <p className="text-lg text-blue-600 mb-4">{profileTranslation?.title || t.about.fullstackDev}</p>

              {/* Contact Info */}
              <div className="space-y-3 text-left">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{profile.email}</span>
                </div>

                {profile.phone && (
                  <div className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>{profile.phone}</span>
                  </div>
                )}

                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{profile.location}</span>
                </div>
              </div>

              {/* Social Links */}
              <h4 className="text-lg font-semibold text-gray-900 mb-4">{t.about.connectWithMe}</h4>
              <div className="flex justify-center space-x-4 mt-6">
                {profile.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-full hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}

                {profile.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}

                {profile.telegram_url && (
                  <a
                    href={profile.telegram_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.about.aboutMeTitle}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{profileTranslation?.bio || t.about.bio}</p>
            </div>

            {/* Experience Timeline */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.about.experience}</h3>
              <div className="space-y-6">
                <div className="flex">
                  <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.about.fullstackDev}</h4>
                    <p className="text-blue-600 font-medium">2022 - Present</p>
                    <p className="text-gray-600 mt-2">{t.about.devExperience}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2 mr-4"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{t.about.managementExp}</h4>
                    <p className="text-green-600 font-medium">20+ Years</p>
                    <p className="text-gray-600 mt-2">{t.about.managementDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.about.education}</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">SkillFactory</h4>
                  <p className="text-blue-600 font-medium">Fullstack Developer Course</p>
                  <p className="text-gray-600">{t.about.skillFactoryDesc}</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="text-lg font-semibold text-gray-900">Stepik</h4>
                  <p className="text-green-600 font-medium">16+ Programming Courses</p>
                  <p className="text-gray-600">{t.about.stepikDesc}</p>
                </div>
              </div>
            </div>

            {/* Skills Summary */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.about.technicalSkills}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {profile.skills.slice(0, 6).map((skill, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{skill.years_experience}+</div>
                    <div className="text-sm text-gray-600">{t.home.skills.years}</div>
                    <div className="font-medium text-gray-900">{skill.technology.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
