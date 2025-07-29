
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
    projects: {
      title: 'My Projects',
      subtitle: 'A collection of my recent work and side projects',
      noProjects: 'No projects found. Add some projects in Django admin!',
      liveDemo: 'Live Demo',
      github: 'GitHub',
      technologies: 'Technologies Used',
      featured: 'Featured',
      stats: {
        totalProjects: 'Total Projects',
        featuredProjects: 'Featured Projects',
        technologiesUsed: 'Technologies Used'
      }
    },
    certificates: {
      title: 'Certificates & Education',
      subtitle: 'My professional certifications and educational achievements',
      noCertificates: 'No certificates found. Add some certificates in Django admin!',
      certified: 'Certified',
      issued: 'Issued',
      viewCertificate: 'View Certificate',
      stats: {
        certificates: 'Certificates Earned',
        courses: 'Courses Completed',
        years: 'Years Learning'
      }
    },
    about: {
      title: 'About Me',
      subtitle: 'Get to know me better',
      aboutMeTitle: 'About Me',
      bio: 'Experienced production manager transitioning to software development. Completed comprehensive training in Python/Django and React. Seeking opportunities to combine technical skills with proven leadership experience.',
      experience: 'Experience',
      education: 'Education',
      interests: 'Interests',
      technicalSkills: 'Technical Skills',
      getInTouch: 'Get In Touch',
      connectWithMe: 'Connect With Me',
      responseTime: 'Response Time',
      responseTimeDesc: 'Usually within 24 hours',
      workingHours: 'Monday - Friday, 9 AM - 6 PM (GMT+3)',
      availableRemote: 'Available for remote work worldwide',
      sendEmail: 'Send Email',
      fullstackDev: 'Fullstack Developer',
      managementExp: 'Management Experience',
      skillFactoryDesc: 'Comprehensive training in modern web development technologies',
      stepikDesc: 'Continuous learning in Python, JavaScript, and web technologies',
      devExperience: 'Developing web applications using Django, React, and modern technologies. Focus on creating scalable and maintainable solutions.',
      managementDesc: 'Extensive management background providing leadership and strategic thinking skills that enhance technical project management.'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your next project',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        sending: 'Sending...'
      }
    },
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      notFound: 'Not found',
      created: 'Created'
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
    projects: {
      title: 'Мои Проекты',
      subtitle: 'Коллекция моих последних работ и побочных проектов',
      noProjects: 'Проекты не найдены. Добавьте проекты в Django админке!',
      liveDemo: 'Демо',
      github: 'GitHub',
      technologies: 'Используемые Технологии',
      featured: 'Рекомендуемый',
      stats: {
        totalProjects: 'Всего Проектов',
        featuredProjects: 'Избранные Проекты',
        technologiesUsed: 'Использованные Технологии'
      }
    },
    certificates: {
      title: 'Сертификаты и Образование',
      subtitle: 'Мои профессиональные сертификаты и образовательные достижения',
      noCertificates: 'Сертификаты не найдены. Добавьте сертификаты в Django админке!',
      certified: 'Сертифицирован',
      issued: 'Выдан',
      viewCertificate: 'Посмотреть Сертификат',
      stats: {
        certificates: 'Получено Сертификатов',
        courses: 'Пройдено Курсов',
        years: 'Лет Обучения'
      }
    },
    about: {
      title: 'Обо Мне',
      subtitle: 'Узнайте меня лучше',
      aboutMeTitle: 'Обо Мне',
      bio: 'Опытный менеджер производства, переходящий в разработку программного обеспечения. Прошел комплексное обучение по Python/Django и React. Ищу возможности объединить технические навыки с проверенным опытом руководства.',
      experience: 'Опыт',
      education: 'Образование',
      interests: 'Интересы',
      technicalSkills: 'Технические Навыки',
      getInTouch: 'Связаться',
      connectWithMe: 'Связаться со Мной',
      responseTime: 'Время Ответа',
      responseTimeDesc: 'Обычно в течение 24 часов',
      workingHours: 'Понедельник - Пятница, 9:00 - 18:00 (GMT+3)',
      availableRemote: 'Доступен для удаленной работы по всему миру',
      sendEmail: 'Отправить Email',
      fullstackDev: 'Fullstack Разработчик',
      managementExp: 'Управленческий Опыт',
      skillFactoryDesc: 'Комплексное обучение современным технологиям веб-разработки',
      stepikDesc: 'Непрерывное изучение Python, JavaScript и веб-технологий',
      devExperience: 'Разработка веб-приложений с использованием Django, React и современных технологий. Фокус на создании масштабируемых и поддерживаемых решений.',
      managementDesc: 'Обширный управленческий опыт, обеспечивающий лидерские качества и стратегическое мышление, которые улучшают управление техническими проектами.'
    },
    contact: {
      title: 'Связаться',
      subtitle: 'Давайте обсудим ваш следующий проект',
      form: {
        name: 'Ваше Имя',
        email: 'Ваш Email',
        subject: 'Тема',
        message: 'Сообщение',
        send: 'Отправить',
        sending: 'Отправка...'
      }
    },
    common: {
      loading: 'Загрузка...',
      error: 'Что-то пошло не так',
      notFound: 'Не найдено',
      created: 'Создано'
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
    projects: {
      title: 'הפרויקטים שלי',
      subtitle: 'אוסף של העבודות האחרונות והפרויקטים הצדדיים שלי',
      noProjects: 'לא נמצאו פרויקטים. הוסף פרויקטים בממשק הניהול של Django!',
      liveDemo: 'דמו חי',
      github: 'GitHub',
      technologies: 'טכנולוגיות בשימוש',
      featured: 'מומלץ',
      stats: {
        totalProjects: 'סך הכל פרויקטים',
        featuredProjects: 'פרויקטים מומלצים',
        technologiesUsed: 'טכנולוגיות בשימוש'
      }
    },
    certificates: {
      title: 'תעודות וחינוך',
      subtitle: 'התעודות המקצועיות וההישגים החינוכיים שלי',
      noCertificates: 'לא נמצאו תעודות. הוסף תעודות בממשק הניהול של Django!',
      certified: 'מוסמך',
      issued: 'הונפק',
      viewCertificate: 'צפה בתעודה',
      stats: {
        certificates: 'תעודות שהושגו',
        courses: 'קורסים שהושלמו',
        years: 'שנות למידה'
      }
    },
    about: {
      title: 'אודותיי',
      subtitle: 'הכר אותי טוב יותר',
      aboutMeTitle: 'אודותיי',
      bio: 'מנהל ייצור מנוסה העובר לפיתוח תוכנה. השלמתי הכשרה מקיפה ב-Python/Django ו-React. מחפש הזדמנויות לשלב כישורים טכניים עם ניסיון הנהגה מוכח.',
      experience: 'ניסיון',
      education: 'חינוך',
      interests: 'תחומי עניין',
      technicalSkills: 'כישורים טכניים',
      getInTouch: 'צור קשר',
      connectWithMe: 'התחבר אליי',
      responseTime: 'זמן תגובה',
      responseTimeDesc: 'בדרך כלל תוך 24 שעות',
      workingHours: 'ראשון - חמישי, 9:00 - 18:00 (GMT+3)',
      availableRemote: 'זמין לעבודה מרחוק ברחבי העולם',
      sendEmail: 'שלח אימייל',
      fullstackDev: 'מפתח Fullstack',
      managementExp: 'ניסיון ניהולי',
      skillFactoryDesc: 'הכשרה מקיפה בטכנולוגיות פיתוח אינטרנט מודרניות',
      stepikDesc: 'למידה מתמשכת ב-Python, JavaScript וטכנולוגיות אינטרנט',
      devExperience: 'פיתוח אפליקציות אינטרנט באמצעות Django, React וטכנולוגיות מודרניות. התמקדות ביצירת פתרונות ניתנים להרחבה ותחזוקה.',
      managementDesc: 'רקע ניהולי נרחב המספק כישורי מנהיגות וחשיבה אסטרטגית המשפרים את ניהול פרויקטים טכניים.'
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'בואו נדבר על הפרויקט הבא שלך',
      form: {
        name: 'השם שלך',
        email: 'האימייל שלך',
        subject: 'נושא',
        message: 'הודעה',
        send: 'שלח הודעה',
        sending: 'שולח...'
      }
    },
    common: {
      loading: 'טוען...',
      error: 'משהו השתבש',
      notFound: 'לא נמצא',
      created: 'נוצר'
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
