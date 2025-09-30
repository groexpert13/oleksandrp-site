export const translations = {
  ru: {
    name: "Олександр Плахута",
    title: "Эксперт по автоматизации и внедрению ИИ",
    description: "Помогаю бизнесу внедрять современные технологии автоматизации и искусственного интеллекта.",
    age: "30 лет",
    experience: "4 года разработки",
    marketing: "10 лет в рекламе и PR",
    services: "Услуги",
    contacts: "Контакты",
    service1: {
      title: "Первичная консультация",
      price: "Бесплатно",
      description: "Оценка возможности внедрения автоматизации и ИИ в ваш бизнес.",
      cta: "Записаться"
    },
    service2: {
      title: "Консультация по внедрению",
      price: "€69 / час",
      description: "Детальный разбор и план внедрения автоматизации и ИИ-решений.",
      cta: "Заказать"
    },
    service3: {
      title: "Проект под ключ",
      price: "По согласованию",
      description: "Полное внедрение от анализа до запуска и поддержки.",
      cta: "Обсудить проект"
    },
    webStack: "Web & App Stack",
    webStackDesc: "Next.js, React, Python, FastAPI, PostgreSQL, MongoDB, Redis, Telegram Web Apps, Telegram Bots",
    aiStack: "AI Stack",
    aiStackDesc: "GPT-4, Claude, Gemini, Grok, LLaMA, LangChain, Vector DB, RAG, Fine-tuning, AI Agents",
    contactTelegramQuick: "Telegram",
    contactTelegramProject: "Telegram",
    contactYoutube: "YouTube",
    contactInstagram: "Instagram",
    telegramQuickDesc: "Быстрая консультация",
    telegramProjectDesc: "Обсуждение проектов",
    youtubeDesc: "Полезные материалы",
    instagramDesc: "Lifestyle",
    videos: [
      "Автоматизация бизнес-процессов с помощью ИИ",
      "Как внедрить ChatGPT в вашу компанию",
      "Кейс: Автоматизация поддержки клиентов",
      "ИИ-агенты для малого бизнеса"
    ]
  },
  uk: {
    name: "Олександр Плахута",
    title: "Експерт з автоматизації та впровадження ШІ",
    description: "Допомагаю бізнесу впроваджувати сучасні технології автоматизації та штучного інтелекту.",
    age: "30 років",
    experience: "4 роки розробки",
    marketing: "10 років у рекламі та PR",
    services: "Послуги",
    contacts: "Контакти",
    service1: {
      title: "Первинна консультація",
      price: "Безкоштовно",
      description: "Оцінка можливості впровадження автоматизації та ШІ у ваш бізнес.",
      cta: "Записатися"
    },
    service2: {
      title: "Консультація з впровадження",
      price: "€69 / година",
      description: "Детальний розбір та план впровадження автоматизації та ШІ-рішень.",
      cta: "Замовити"
    },
    service3: {
      title: "Проект під ключ",
      price: "За домовленістю",
      description: "Повне впровадження від аналізу до запуску та підтримки.",
      cta: "Обговорити проект"
    },
    webStack: "Web & App Stack",
    webStackDesc: "Next.js, React, Python, FastAPI, PostgreSQL, MongoDB, Redis, Telegram Web Apps, Telegram Bots",
    aiStack: "AI Stack",
    aiStackDesc: "GPT-4, Claude, Gemini, Grok, LLaMA, LangChain, Vector DB, RAG, Fine-tuning, AI Agents",
    contactTelegramQuick: "Telegram",
    contactTelegramProject: "Telegram",
    contactYoutube: "YouTube",
    contactInstagram: "Instagram",
    telegramQuickDesc: "Швидка консультація",
    telegramProjectDesc: "Обговорення проектів",
    youtubeDesc: "Корисні матеріали",
    instagramDesc: "Lifestyle",
    videos: [
      "Автоматизація бізнес-процесів за допомогою ШІ",
      "Як впровадити ChatGPT у вашу компанію",
      "Кейс: Автоматизація підтримки клієнтів",
      "ШІ-агенти для малого бізнесу"
    ]
  }
}

export type Language = 'ru' | 'uk'

export function detectLanguage(): Language {
  if (typeof window === 'undefined') return 'ru'
  
  const browserLang = navigator.language.toLowerCase()
  if (browserLang.startsWith('uk')) return 'uk'
  return 'ru'
}
