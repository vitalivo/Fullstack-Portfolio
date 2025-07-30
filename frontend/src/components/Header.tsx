"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"
import { LanguageSwitcher } from "./LanguageSwitcher"

export default function Header() {
  const { t } = useLanguage()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            Vitaliy Voloshin
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.about}
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.projects}
            </Link>
            <Link href="/certificates" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.certificates}
            </Link>
            <Link href="/resume" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.resume}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.contact}
            </Link>
          </nav>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
