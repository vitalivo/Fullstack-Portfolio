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
      // Common
      common: {
        loading: "Loading...",
        error: "Error loading data",
      },

      // Navigation
      nav: {
        home: "Home",
        about: "About",
        projects: "Projects",
        certificates: "Certificates",
        resume: "Resume",
        contact: "Contact",
      },

      // Home page
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

      // About page
      about: {
        title: "About Me",
        subtitle: "Get to know me better",
        connectWithMe: "Connect With Me",
        aboutMeTitle: "About Me",
        bio: "I'm a passionate Full Stack Developer with expertise in modern web technologies. I love creating innovative solutions and bringing ideas to life through code.",
        experience: "Professional Experience",
        fullstackDev: "Full Stack Developer",
        devExperience: "Developing modern web applications using React, Django, and other cutting-edge technologies.",
        managementExp: "Management Experience",
        managementDesc: "Extensive experience in team leadership and project management across various industries.",
        education: "Education & Learning",
        skillFactoryDesc: "Comprehensive full-stack development program covering modern web technologies.",
        stepikDesc: "Continuous learning through various programming courses and certifications.",
        technicalSkills: "Technical Skills Overview",
      },

      // Projects page
      projects: {
        title: "My Projects",
        subtitle: "A showcase of my recent work and applications",
        viewProject: "View Project",
        viewCode: "View Code",
        technologies: "Technologies",
        noProjects: "Projects will be displayed here once added.",
        stats: {
          total: "Total Projects",
          technologies: "Technologies Used",
          inProgress: "In Progress",
        },
      },

      // Certificates page
      certificates: {
        title: "Certificates & Achievements",
        subtitle: "My professional certifications and completed courses",
        issuer: "Issued by",
        date: "Date",
        viewCertificate: "View Certificate",
        noCertificates: "Certificates will be displayed here once added.",
        stats: {
          total: "Total Certificates",
          platforms: "Learning Platforms",
          hours: "Study Hours",
        },
      },

      // Resume page
      resume: {
        title: "Resume & CV",
        subtitle: "Download my professional resume tailored for different positions",
        chooseVersion: "Choose Version",
        downloadPdf: "Download PDF",
        downloading: "Downloading...",
        atsOptimized: "PDF format • Optimized for ATS systems",
        noSelected: "No Resume Selected",
        chooseTemplate: "Choose a resume template from the left to preview",
        whyDownload: "Why Download My Resume?",
        features: {
          ats: {
            title: "ATS Optimized",
            description: "Formatted to pass through Applicant Tracking Systems",
          },
          updated: {
            title: "Always Updated",
            description: "Latest projects and skills automatically included",
          },
          specific: {
            title: "Role Specific",
            description: "Tailored versions for different positions",
          },
        },
      },

      // Contact page
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
      // Common
      common: {
        loading: "Загрузка...",
        error: "Ошибка загрузки данных",
      },

      // Navigation
      nav: {
        home: "Главная",
        about: "Обо мне",
        projects: "Проекты",
        certificates: "Сертификаты",
        resume: "Резюме",
        contact: "Контакты",
      },

      // Home page
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

      // About page
      about: {
        title: "Обо Мне",
        subtitle: "Узнайте меня лучше",
        connectWithMe: "Связаться со Мной",
        aboutMeTitle: "Обо Мне",
        bio: "Я увлеченный Full Stack разработчик с экспертизой в современных веб-технологиях. Люблю создавать инновационные решения и воплощать идеи в жизнь через код.",
        experience: "Профессиональный Опыт",
        fullstackDev: "Full Stack Разработчик",
        devExperience:
          "Разработка современных веб-приложений с использованием React, Django и других передовых технологий.",
        managementExp: "Управленческий Опыт",
        managementDesc: "Обширный опыт руководства командой и управления проектами в различных отраслях.",
        education: "Образование и Обучение",
        skillFactoryDesc: "Комплексная программа full-stack разработки, охватывающая современные веб-технологии.",
        stepikDesc: "Непрерывное обучение через различные курсы программирования и сертификации.",
        technicalSkills: "Обзор Технических Навыков",
      },

      // Projects page
      projects: {
        title: "Мои Проекты",
        subtitle: "Витрина моих последних работ и приложений",
        viewProject: "Посмотреть Проект",
        viewCode: "Посмотреть Код",
        technologies: "Технологии",
        noProjects: "Проекты будут отображены здесь после добавления.",
        stats: {
          total: "Всего Проектов",
          technologies: "Использованных Технологий",
          inProgress: "В Разработке",
        },
      },

      // Certificates page
      certificates: {
        title: "Сертификаты и Достижения",
        subtitle: "Мои профессиональные сертификаты и пройденные курсы",
        issuer: "Выдан",
        date: "Дата",
        viewCertificate: "Посмотреть Сертификат",
        noCertificates: "Сертификаты будут отображены здесь после добавления.",
        stats: {
          total: "Всего Сертификатов",
          platforms: "Платформ Обучения",
          hours: "Часов Изучения",
        },
      },

      // Resume page
      resume: {
        title: "Резюме и CV",
        subtitle: "Скачайте мое профессиональное резюме, адаптированное для разных позиций",
        chooseVersion: "Выберите Версию",
        downloadPdf: "Скачать PDF",
        downloading: "Скачивание...",
        atsOptimized: "PDF формат • Оптимизировано для ATS систем",
        noSelected: "Резюме Не Выбрано",
        chooseTemplate: "Выберите шаблон резюме слева для предпросмотра",
        whyDownload: "Почему Стоит Скачать Мое Резюме?",
        features: {
          ats: {
            title: "ATS Оптимизировано",
            description: "Отформатировано для прохождения через системы отслеживания кандидатов",
          },
          updated: {
            title: "Всегда Актуально",
            description: "Последние проекты и навыки автоматически включены",
          },
          specific: {
            title: "Под Конкретную Роль",
            description: "Адаптированные версии для разных позиций",
          },
        },
      },

      // Contact page
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
      // Common
      common: {
        loading: "טוען...",
        error: "שגיאה בטעינת הנתונים",
      },

      // Navigation
      nav: {
        home: "בית",
        about: "אודות",
        projects: "פרויקטים",
        certificates: "תעודות",
        resume: "קורות חיים",
        contact: "צור קשר",
      },

      // Home page
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

      // About page
      about: {
        title: "אודותיי",
        subtitle: "הכר אותי טוב יותר",
        connectWithMe: "התחבר אליי",
        aboutMeTitle: "אודותיי",
        bio: "אני מפתח Full Stack נלהב עם מומחיות בטכנולוגיות אינטרנט מודרניות. אני אוהב ליצור פתרונות חדשניים ולהביא רעיונות לחיים דרך קוד.",
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

      // Projects page
      projects: {
        title: "הפרויקטים שלי",
        subtitle: "מבחר מהעבודות והאפליקציות האחרונות שלי",
        viewProject: "צפה בפרויקט",
        viewCode: "צפה בקוד",
        technologies: "טכנולוגיות",
        noProjects: "פרויקטים יוצגו כאן לאחר הוספה.",
        stats: {
          total: "סך הכל פרויקטים",
          technologies: "טכנולוגיות בשימוש",
          inProgress: "בפיתוח",
        },
      },

      // Certificates page
      certificates: {
        title: "תעודות והישגים",
        subtitle: "התעודות המקצועיות והקורסים שהשלמתי",
        issuer: "הונפק על ידי",
        date: "תאריך",
        viewCertificate: "צפה בתעודה",
        noCertificates: "תעודות יוצגו כאן לאחר הוספה.",
        stats: {
          total: "סך הכל תעודות",
          platforms: "פלטפורמות למידה",
          hours: "שעות לימוד",
        },
      },

      // Resume page
      resume: {
        title: "קורות חיים ו-CV",
        subtitle: "הורד את קורות החיים המקצועיים שלי המותאמים לתפקידים שונים",
        chooseVersion: "בחר גרסה",
        downloadPdf: "הורד PDF",
        downloading: "מוריד...",
        atsOptimized: "פורמט PDF • מותאם למערכות ATS",
        noSelected: "לא נבחרו קורות חיים",
        chooseTemplate: "בחר תבנית קורות חיים משמאל לתצוגה מקדימה",
        whyDownload: "למה להוריד את קורות החיים שלי?",
        features: {
          ats: {
            title: "מותאם ל-ATS",
            description: "מעוצב לעבור דרך מערכות מעקב מועמדים",
          },
          updated: {
            title: "תמיד מעודכן",
            description: "הפרויקטים והכישורים האחרונים נכללים אוטומטית",
          },
          specific: {
            title: "ספציפי לתפקיד",
            description: "גרסאות מותאמות לתפקידים שונים",
          },
        },
      },

      // Contact page
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
