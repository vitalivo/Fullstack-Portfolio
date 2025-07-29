
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, isRTL } = useLanguage();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-gray-900">Portfolio</div>
              <div className="text-xs text-gray-500 -mt-1">Fullstack Developer</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.about}
            </Link>
            <Link href="/projects" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.projects}
            </Link>
            <Link href="/certificates" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.certificates}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              {t.nav.contact}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
            <div className="flex flex-col space-y-3 pt-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2 font-medium">{t.nav.home}</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2 font-medium">{t.nav.about}</Link>
              <Link href="/projects" className="text-gray-700 hover:text-blue-600 py-2 font-medium">{t.nav.projects}</Link>
              <Link href="/certificates" className="text-gray-700 hover:text-blue-600 py-2 font-medium">{t.nav.certificates}</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2 font-medium">{t.nav.contact}</Link>
              <div className="pt-3 border-t border-gray-100">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
