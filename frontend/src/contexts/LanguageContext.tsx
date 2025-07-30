// src/contexts/LanguageContext.tsx
"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface LanguageContextType {
  language: string
  setLanguage: (language: string) => void
  t: any
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState("en")

  const translations = {
    en: {
      common: {
        loading: "Loading...",
        error: "Error loading data",
      },
      nav: {
        home: "Home",
        about: "About", 
        projects: "Projects",
        certificates: "Certificates",
        contact: "Contact",
      },
      home: {
        hero: {
          title: "Full Stack Developer",
          subtitle: "Passionate about creating innovative web solutions with modern technologies",
          github: "GitHub",
          linkedin: "LinkedIn",
        },
        skills: {
          title: "Technical Skills",
          subtitle: "Technologies I work with to bring ideas to life",
          experience: "Experience",
          years: "years",
        },
        explore: {
          title: "Explore My Work",
          subtitle: "Discover my projects, certifications, and professional journey",
          projects: {
            title: "Projects",
            description: "Explore my latest web development projects and applications",
            link: "View Projects",
          },
          certificates: {
            title: "Certificates", 
            description: "Professional certifications and completed courses",
            link: "View Certificates",
          },
          about: {
            title: "About Me",
            description: "Learn more about my background and experience", 
            link: "Learn More",
          },
        },
        contact: {
          title: "Ready to Work Together?",
          subtitle: "Let's discuss your next project",
          email: "Email",
          location: "Location",
          button: "Get In Touch",
        },
      },
      about: {
        title: "About Me",
        subtitle: "Get to know me better",
        connectWithMe: "Connect With Me",
        aboutMeTitle: "About Me",
        bio: "I'm a passionate Full Stack Developer with expertise in modern web technologies.",
        experience: "Professional Experience",
        fullstackDev: "Full Stack Developer", 
        devExperience: "Developing modern web applications using React, Django, and other cutting-edge technologies.",
        managementExp: "Management Experience",
        managementDesc: "Extensive experience in team leadership and project management.",
        education: "Education & Learning",
        skillFactoryDesc: "Comprehensive full-stack development program covering modern web technologies.",
        stepikDesc: "Continuous learning through various programming courses and certifications.",
        technicalSkills: "Technical Skills Overview",
      },
      projects: {
        title: "My Projects",
        subtitle: "A showcase of my recent work and applications",
        viewProject: "View Project",
        viewCode: "View Code", 
        technologies: "Technologies",
        noProjects: "Projects will be displayed here once added.",
        stats: {
          totalProjects: "Total Projects",
          technologies: "Technologies Used",
          completedProjects: "Completed Projects"
        }
      },
      certificates: {
        title: "Certificates & Achievements",
        subtitle: "My professional certifications and completed courses",
        issuer: "Issued by",
        date: "Date",
        viewCertificate: "View Certificate",
        noCertificates: "Certificates will be displayed here once added.",
        stats: {
          certificates: "Total Certificates",
          courses: "Courses Completed",
          skills: "Skills Acquired"
        }
      },
      contact: {
        title: "Get In Touch",
        subtitle: "Have a project in mind? Let's work together to create something amazing.",
        form: {
          name: "Full Name",
          email: "Email Address", 
          subject: "Subject",
          message: "Message",
          send: "Send Message",
          sending: "Sending...",
        },
      },
    },
    ru: {
      common: {
        loading: "Загрузка...",
        error: "Ошибка загрузки данных",
      },
      nav: {
        home: "Главная",
        about: "Обо мне",
        projects: "Проекты", 
        certificates: "Сертификаты",
        contact: "Контакты",
      },
      home: {
        hero: {
          title: "Full Stack Разработчик",
          subtitle: "Увлечен созданием инновационных веб-решений с использованием современных технологий",
          github: "GitHub",
          linkedin: "LinkedIn",
        },
        skills: {
          title: "Технические Навыки",
          subtitle: "Технологии, с которыми я работаю для воплощения идей в жизнь",
          experience: "Опыт",
          years: "лет",
        },
        explore: {
          title: "Изучите Мою Работу",
          subtitle: "Откройте для себя мои проекты, сертификаты и профессиональный путь",
          projects: {
            title: "Проекты",
            description: "Изучите мои последние проекты веб-разработки и приложения",
            link: "Посмотреть Проекты",
          },
          certificates: {
            title: "Сертификаты",
            description: "Профессиональные сертификаты и пройденные курсы", 
            link: "Посмотреть Сертификаты",
          },
          about: {
            title: "Обо Мне",
            description: "Узнайте больше о моем опыте и образовании",
            link: "Узнать Больше",
          },
        },
        contact: {
          title: "Готовы Работать Вместе?",
          subtitle: "Давайте обсудим ваш следующий проект",
          email: "Email",
          location: "Местоположение",
          button: "Связаться",
        },
      },
      about: {
        title: "Обо Мне",
        subtitle: "Узнайте меня лучше",
        connectWithMe: "Связаться со Мной",
        aboutMeTitle: "Обо Мне", 
        bio: "Я увлеченный Full Stack разработчик с экспертизой в современных веб-технологиях.",
        experience: "Профессиональный Опыт",
        fullstackDev: "Full Stack Разработчик",
        devExperience: "Разработка современных веб-приложений с использованием React, Django и других передовых технологий.",
        managementExp: "Управленческий Опыт",
        managementDesc: "Обширный опыт руководства командой и управления проектами в различных отраслях.",
        education: "Образование и Обучение",
        skillFactoryDesc: "Комплексная программа full-stack разработки, охватывающая современные веб-технологии.",
        stepikDesc: "Непрерывное обучение через различные курсы программирования и сертификации.",
        technicalSkills: "Обзор Технических Навыков",
      },
      projects: {
        title: "Мои Проекты",
        subtitle: "Витрина моих последних работ и приложений",
        viewProject: "Посмотреть Проект",
        viewCode: "Посмотреть Код",
        technologies: "Технологии",
        noProjects: "Проекты будут отображены здесь после добавления.",
        stats: {
          totalProjects: "Всего Проектов",
          technologies: "Использованных Технологий",
          completedProjects: "Завершенных Проектов"
        }
      },
      certificates: {
        title: "Сертификаты и Достижения",
        subtitle: "Мои профессиональные сертификаты и пройденные курсы",
        issuer: "Выдан",
        date: "Дата",
        viewCertificate: "Посмотреть Сертификат",
        noCertificates: "Сертификаты будут отображены здесь после добавления.",
        stats: {
          certificates: "Всего Сертификатов",
          courses: "Пройденных Курсов",
          skills: "Освоенных Навыков"
        }
      },
      contact: {
        title: "Свяжитесь со Мной",
        subtitle: "Есть проект? Давайте работать вместе, чтобы создать что-то удивительное.",
        form: {
          name: "Полное Имя",
          email: "Email Адрес",
          subject: "Тема", 
          message: "Сообщение",
          send: "Отправить Сообщение",
          sending: "Отправка...",
        },
      },
    },
    he: {
      common: {
        loading: "טוען...",
        error: "שגיאה בטעינת הנתונים",
      },
      nav: {
        home: "בית",
        about: "אודות",
        projects: "פרויקטים",
        certificates: "תעודות",
        contact: "צור קשר",
      },
      home: {
        hero: {
          title: "מפתח Full Stack",
          subtitle: "נלהב ליצור פתרונות אינטרנט חדשניים עם טכנולוגיות מודרניות",
          github: "GitHub",
          linkedin: "LinkedIn",
        },
        skills: {
          title: "כישורים טכניים",
          subtitle: "טכנולוגיות שאני עובד איתן כדי להביא רעיונות לחיים",
          experience: "ניסיון",
          years: "שנים",
        },
        explore: {
          title: "גלה את העבודה שלי",
          subtitle: "גלה את הפרויקטים, התעודות והמסע המקצועי שלי",
          projects: {
            title: "פרויקטים",
            description: "גלה את פרויקטי פיתוח האינטרנט והאפליקציות האחרונים שלי",
            link: "צפה בפרויקטים",
          },
          certificates: {
            title: "תעודות",
            description: "תעודות מקצועיות וקורסים שהושלמו",
            link: "צפה בתעודות",
          },
          about: {
            title: "אודותיי",
            description: "למד עוד על הרקע והניסיון שלי",
            link: "למד עוד",
          },
        },
        contact: {
          title: "מוכן לעבוד יחד?",
          subtitle: "בואו נדון בפרויקט הבא שלך",
          email: "אימייל",
          location: "מיקום",
          button: "צור קשר",
        },
      },
      about: {
        title: "אודותיי",
        subtitle: "הכר אותי טוב יותר",
        connectWithMe: "התחבר אליי",
        aboutMeTitle: "אודותיי",
        bio: "אני מפתח Full Stack נלהב עם מומחיות בטכנולוגיות אינטרנט מודרניות.",
        experience: "ניסיון מקצועי",
        fullstackDev: "מפתח Full Stack",
        devExperience: "פיתוח אפליקציות אינטרנט מודרניות באמצעות React, Django וטכנולוגיות מתקדמות אחרות.",
        managementExp: "ניסיון ניהולי",
        managementDesc: "ניסיון נרחב בהובלת צוותים וניהול פרויקטים בתעשיות שונות.",
        education: "חינוך ולמידה",
        skillFactoryDesc: "תוכנית פיתוח full-stack מקיפה המכסה טכנולוגיות אינטרנט מודרניות.",
        stepikDesc: "למידה מתמשכת דרך קורסי תכנות ותעודות שונות.",
        technicalSkills: "סקירת כישורים טכניים",
      },
      projects: {
        title: "הפרויקטים שלי",
        subtitle: "מבחר מהעבודות והאפליקציות האחרונות שלי",
        viewProject: "צפה בפרויקט",
        viewCode: "צפה בקוד",
        technologies: "טכנולוגיות",
        noProjects: "פרויקטים יוצגו כאן לאחר הוספה.",
        stats: {
          totalProjects: "סך הכל פרויקטים",
          technologies: "טכנולוגיות בשימוש",
          completedProjects: "פרויקטים שהושלמו"
        }
      },
      certificates: {
        title: "תעודות והישגים",
        subtitle: "התעודות המקצועיות והקורסים שהשלמתי",
        issuer: "הונפק על ידי",
        date: "תאריך",
        viewCertificate: "צפה בתעודה",
        noCertificates: "תעודות יוצגו כאן לאחר הוספה.",
        stats: {
          certificates: "סך הכל תעודות",
          courses: "קורסים שהושלמו",
          skills: "כישורים שנרכשו"
        }
      },
      contact: {
        title: "צור קשר",
        subtitle: "יש לך פרויקט בראש? בואו נעבוד יחד כדי ליצור משהו מדהים.",
        form: {
          name: "שם מלא",
          email: "כתובת אימייל",
          subject: "נושא",
          message: "הודעה",
          send: "שלח הודעה",
          sending: "שולח...",
        },
      },
    },
  }

  const t = translations[language as keyof typeof translations] || translations.en

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}