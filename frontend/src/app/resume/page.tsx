"use client"

import { useEffect, useState } from "react"
import { resumeAPI, type ResumeTemplate } from "@/lib/resume-api"
import { useLanguage } from "@/contexts/LanguageContext"

export default function ResumePage() {
  const [templates, setTemplates] = useState<ResumeTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [downloading, setDownloading] = useState<number | null>(null)
  const { t, language } = useLanguage()

  // Переводы для позиций резюме
  const positionTranslations = {
    en: {
      fullstack: "Full Stack Developer",
      frontend: "Frontend Developer",
      backend: "Backend Developer",
      python: "Python Developer",
      react: "React Developer",
    },
    ru: {
      fullstack: "Full Stack Разработчик",
      frontend: "Frontend Разработчик",
      backend: "Backend Разработчик",
      python: "Python Разработчик",
      react: "React Разработчик",
    },
    he: {
      fullstack: "מפתח Full Stack",
      frontend: "מפתח Frontend",
      backend: "מפתח Backend",
      python: "מפתח Python",
      react: "מפתח React",
    },
  }

  // Переводы контента резюме
  const resumeContentTranslations = {
    en: {
      // Заголовки секций
      "Work Experience": "Work Experience",
      "Professional Summary": "Professional Summary",
      "Technical Skills": "Technical Skills",
      Education: "Education",
      Projects: "Projects",

      // Контент
      "Full Stack Developer (2022 - Present)": "Full Stack Developer (2022 - Present)",
      "Developed modern web applications using React and Django":
        "Developed modern web applications using React and Django",
      "Built RESTful APIs serving 1000+ daily users": "Built RESTful APIs serving 1000+ daily users",
      "Implemented responsive designs with Tailwind CSS": "Implemented responsive designs with Tailwind CSS",
      "Collaborated with cross-functional teams using Agile methodology":
        "Collaborated with cross-functional teams using Agile methodology",

      "Passionate Full Stack Developer with 2+ years of experience in modern web technologies. Expertise in React, Django, and cloud deployment. Strong background in both frontend and backend development with a focus on creating scalable web applications.":
        "Passionate Full Stack Developer with 2+ years of experience in modern web technologies. Expertise in React, Django, and cloud deployment. Strong background in both frontend and backend development with a focus on creating scalable web applications.",
    },
    ru: {
      // Заголовки секций
      "Work Experience": "Опыт Работы",
      "Professional Summary": "Профессиональное Резюме",
      "Technical Skills": "Технические Навыки",
      Education: "Образование",
      Projects: "Проекты",

      // Контент
      "Full Stack Developer (2022 - Present)": "Full Stack Разработчик (2022 - Настоящее время)",
      "Developed modern web applications using React and Django":
        "Разработка современных веб-приложений с использованием React и Django",
      "Built RESTful APIs serving 1000+ daily users":
        "Создание RESTful API, обслуживающих 1000+ пользователей ежедневно",
      "Implemented responsive designs with Tailwind CSS": "Реализация адаптивного дизайна с помощью Tailwind CSS",
      "Collaborated with cross-functional teams using Agile methodology":
        "Сотрудничество с кросс-функциональными командами по методологии Agile",

      "Passionate Full Stack Developer with 2+ years of experience in modern web technologies. Expertise in React, Django, and cloud deployment. Strong background in both frontend and backend development with a focus on creating scalable web applications.":
        "Увлеченный Full Stack разработчик с опытом работы 2+ года в современных веб-технологиях. Экспертиза в React, Django и облачном развертывании. Сильный опыт как в frontend, так и в backend разработке с фокусом на создание масштабируемых веб-приложений.",
    },
    he: {
      // Заголовки секций
      "Work Experience": "ניסיון תעסוקתי",
      "Professional Summary": "סיכום מקצועי",
      "Technical Skills": "כישורים טכניים",
      Education: "השכלה",
      Projects: "פרויקטים",

      // Контент
      "Full Stack Developer (2022 - Present)": "מפתח Full Stack (2022 - היום)",
      "Developed modern web applications using React and Django":
        "פיתוח אפליקציות אינטרנט מודרניות באמצעות React ו-Django",
      "Built RESTful APIs serving 1000+ daily users": "בניית RESTful APIs המשרתים 1000+ משתמשים יומיים",
      "Implemented responsive designs with Tailwind CSS": "יישום עיצובים רספונסיביים עם Tailwind CSS",
      "Collaborated with cross-functional teams using Agile methodology":
        "שיתוף פעולה עם צוותים רב-תחומיים במתודולוגיית Agile",

      "Passionate Full Stack Developer with 2+ years of experience in modern web technologies. Expertise in React, Django, and cloud deployment. Strong background in both frontend and backend development with a focus on creating scalable web applications.":
        "מפתח Full Stack נלהב עם ניסיון של 2+ שנים בטכנולוגיות אינטרנט מודרניות. מומחיות ב-React, Django ופריסה בענן. רקע חזק הן בפיתוח frontend והן ב-backend עם התמקדות ביצירת אפליקציות אינטרנט ניתנות להרחבה.",
    },
  }

  // Функция для получения переведенного названия позиции
  const getTranslatedPosition = (position: string) => {
    const translations = positionTranslations[language as keyof typeof positionTranslations] || positionTranslations.en
    return translations[position as keyof typeof translations] || position
  }

  // Функция для перевода контента
  const translateContent = (content: string) => {
    const translations =
      resumeContentTranslations[language as keyof typeof resumeContentTranslations] || resumeContentTranslations.en

    // Разбиваем контент на строки и переводим каждую
    const lines = content.split("\n")
    const translatedLines = lines.map((line) => {
      const trimmedLine = line.trim()
      if (trimmedLine === "") return line

      // Ищем точное совпадение
      const exactMatch = translations[trimmedLine as keyof typeof translations]
      if (exactMatch) return line.replace(trimmedLine, exactMatch)

      // Ищем частичные совпадения для bullet points
      if (trimmedLine.startsWith("• ") || trimmedLine.startsWith("- ")) {
        const bulletContent = trimmedLine.substring(2)
        const bulletTranslation = translations[bulletContent as keyof typeof translations]
        if (bulletTranslation) {
          return line.replace(bulletContent, bulletTranslation)
        }
      }

      return line
    })

    return translatedLines.join("\n")
  }

  // Функция для перевода заголовка секции
  const translateSectionTitle = (title: string) => {
    const translations =
      resumeContentTranslations[language as keyof typeof resumeContentTranslations] || resumeContentTranslations.en
    return translations[title as keyof typeof translations] || title
  }

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setError(null)
        const response = await resumeAPI.getTemplates()
        setTemplates(response.data)
        if (response.data.length > 0) {
          setSelectedTemplate(response.data[0])
        }
      } catch (error) {
        console.error("Error fetching resume templates:", error)
        setError("Failed to load resume templates. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const handleDownload = async (templateId: number) => {
    setDownloading(templateId)
    try {
      await resumeAPI.downloadPDF(templateId)
    } catch (error) {
      console.error("Error downloading resume:", error)
      setError("Failed to download resume. Please try again.")
    } finally {
      setDownloading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl">{t.common.loading}</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-xl text-red-600 mb-4">{error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>
          <div className="text-xl text-gray-600">No resume templates available</div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t.resume.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t.resume.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Template Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.resume.chooseVersion}</h2>

              <div className="space-y-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                      selectedTemplate?.id === template.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-sm text-blue-600 mb-2">{getTranslatedPosition(template.position)}</p>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </button>
                ))}
              </div>

              {/* Download Button */}
              {selectedTemplate && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleDownload(selectedTemplate.id)}
                    disabled={downloading === selectedTemplate.id}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {downloading === selectedTemplate.id ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t.resume.downloading}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {t.resume.downloadPdf}
                      </div>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-2">{t.resume.atsOptimized}</p>
                </div>
              )}
            </div>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Vitaliy Voloshin</h2>
                  <h3 className="text-xl text-blue-600 mb-4">{getTranslatedPosition(selectedTemplate.position)}</h3>

                  {/* Contact Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      vitaliy.voloshin@example.com
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      Israel
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      github.com/vitaliyvoloshin
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                      linkedin.com/in/vitaliyvoloshin
                    </div>
                  </div>
                </div>

                {/* Resume Sections */}
                <div className="space-y-8">
                  {selectedTemplate.sections.map((section, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-gray-200">
                        {translateSectionTitle(section.title)}
                      </h4>
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {translateContent(section.content)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t border-gray-200 text-center">
                  <p className="text-sm text-gray-500">
                    {language === "ru"
                      ? "Это резюме оптимизировано для систем отслеживания кандидатов (ATS)"
                      : language === "he"
                        ? "קורות החיים האלה מותאמים למערכות מעקב מועמדים (ATS)"
                        : "This resume is optimized for Applicant Tracking Systems (ATS)"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.resume.noSelected}</h3>
                <p className="text-gray-600">{t.resume.chooseTemplate}</p>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">{t.resume.whyDownload}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.resume.features.ats.title}</h3>
              <p className="text-sm text-gray-600">{t.resume.features.ats.description}</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.resume.features.updated.title}</h3>
              <p className="text-sm text-gray-600">{t.resume.features.updated.description}</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t.resume.features.specific.title}</h3>
              <p className="text-sm text-gray-600">{t.resume.features.specific.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
