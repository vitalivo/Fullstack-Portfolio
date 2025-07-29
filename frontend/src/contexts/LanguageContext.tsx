
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Встроенные переводы
const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      certificates: 'Certificates',
      contact: 'Contact'
    },
    home: {
      hero: {
        title: 'Fullstack Developer',
        subtitle: 'Passionate about creating amazing web applications',
        github: 'GitHub',
        linkedin: 'LinkedIn'
      },
      skills: {
        title: 'Technical Skills',
        subtitle: 'Technologies I work with',
        category: 'Category',
        experience: 'Experience',
        years: 'years'
      },
      explore: {
        title: 'Explore My Work',
        subtitle: 'Discover more about my experience and projects',
        projects: {
          title: 'Projects',
          description: 'Check out my latest web applications and development work',
          link: 'View Projects'
        },
        certificates: {
          title: 'Certificates',
          description: 'My professional certifications and educational achievements',
          link: 'View Certificates'
        },
        about: {
          title: 'About Me',
          description: 'Learn more about my background, experience, and journey',
          link: 'Learn More'
        }
      },
      contact: {
        title: 'Ready to Work Together?',
        subtitle: 'I am always open to discussing new opportunities and interesting projects',
        email: 'Email',
        location: 'Location',
        button: 'Get In Touch'
      }
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      notFound: 'Not found'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'Обо мне',
      projects: 'Проекты',
      certificates: 'Сертификаты',
      contact: 'Контакты'
    },
    home: {
      hero: {
        title: 'Fullstack Разработчик',
        subtitle: 'Увлечен созданием потрясающих веб-приложений',
        github: 'GitHub',
        linkedin: 'LinkedIn'
      },
      skills: {
        title: 'Технические Навыки',
        subtitle: 'Технологии, с которыми я работаю',
        category: 'Категория',
        experience: 'Опыт',
        years: 'лет'
      },
      explore: {
        title: 'Изучите Мою Работу',
        subtitle: 'Узнайте больше о моем опыте и проектах',
        projects: {
          title: 'Проекты',
          description: 'Посмотрите мои последние веб-приложения и разработки',
          link: 'Смотреть Проекты'
        },
        certificates: {
          title: 'Сертификаты',
          description: 'Мои профессиональные сертификаты и образовательные достижения',
          link: 'Смотреть Сертификаты'
        },
        about: {
          title: 'Обо Мне',
          description: 'Узнайте больше о моем опыте, образовании и пути развития',
          link: 'Узнать Больше'
        }
      },
      contact: {
        title: 'Готовы Работать Вместе?',
        subtitle: 'Я всегда открыт для обсуждения новых возможностей и интересных проектов',
        email: 'Email',
        location: 'Местоположение',
        button: 'Связаться'
      }
    },
    common: {
      loading: 'Загрузка...',
      error: 'Что-то пошло не так',
      notFound: 'Не найдено'
    }
  },
  he: {
    nav: {
      home: 'בית',
      about: 'אודות',
      projects: 'פרויקטים',
      certificates: 'תעודות',
      contact: 'צור קשר'
    },
    home: {
      hero: {
        title: 'מפתח Fullstack',
        subtitle: 'נלהב ליצור אפליקציות אינטרנט מדהימות',
        github: 'GitHub',
        linkedin: 'LinkedIn'
      },
      skills: {
        title: 'כישורים טכניים',
        subtitle: 'טכנולוגיות שאני עובד איתן',
        category: 'קטגוריה',
        experience: 'ניסיון',
        years: 'שנים'
      },
      explore: {
        title: 'חקור את העבודה שלי',
        subtitle: 'גלה עוד על הניסיון והפרויקטים שלי',
        projects: {
          title: 'פרויקטים',
          description: 'בדוק את אפליקציות האינטרנט והפיתוחים האחרונים שלי',
          link: 'צפה בפרויקטים'
        },
        certificates: {
          title: 'תעודות',
          description: 'התעודות המקצועיות וההישגים החינוכיים שלי',
          link: 'צפה בתעודות'
        },
        about: {
          title: 'אודותיי',
          description: 'למד עוד על הרקע, הניסיון והמסע שלי',
          link: 'למד עוד'
        }
      },
      contact: {
        title: 'מוכן לעבוד יחד?',
        subtitle: 'אני תמיד פתוח לדיון על הזדמנויות חדשות ופרויקטים מעניינים',
        email: 'אימייל',
        location: 'מיקום',
        button: 'צור קשר'
      }
    },
    common: {
      loading: 'טוען...',
      error: 'משהו השתבש',
      notFound: 'לא נמצא'
    }
  }
};

// Встроенные языки
export const languages = {
  en: { name: 'English', flag: '🇺🇸' },
  ru: { name: 'Русский', flag: '🇷🇺' },
  he: { name: 'עברית', flag: '🇮🇱' }
} as const;

export type Language = keyof typeof languages;
type TranslationKeys = typeof translations.en;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    isRTL: language === 'he'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
