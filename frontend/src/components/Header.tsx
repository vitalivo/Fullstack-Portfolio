
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
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Виталий
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden md:flex space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
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
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          {/* Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.home}</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.about}</Link>
              <Link href="/projects" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.projects}</Link>
              <Link href="/certificates" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.certificates}</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.contact}</Link>
              <div className="pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
