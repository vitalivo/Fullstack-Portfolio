
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/contexts/LanguageContext'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Vitaliy - Fullstack Developer',
  description: 'Portfolio website of Vitaliy - Fullstack Developer specializing in Python, Django, React, and modern web technologies',
  keywords: 'fullstack developer, python, django, react, javascript, web development, portfolio',
  authors: [{ name: 'Vitaliy' }],
  openGraph: {
    title: 'Vitaliy - Fullstack Developer',
    description: 'Portfolio website showcasing my projects and skills',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
