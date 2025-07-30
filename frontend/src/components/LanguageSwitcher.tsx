"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "en", name: "EN", flag: "🇺🇸" },
    { code: "ru", name: "RU", flag: "🇷🇺" },
    { code: "he", name: "HE", flag: "🇮🇱" },
  ]

  return (
    <div className="relative">
      <div className="flex items-center space-x-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
              language === lang.code
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md transform scale-105"
                : "text-gray-600 hover:text-blue-600 hover:bg-white hover:shadow-sm"
            }`}
          >
            <span className="text-xs">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
