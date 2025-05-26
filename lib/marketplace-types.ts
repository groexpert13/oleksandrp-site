import { Language } from "./i18n/translations";

export type MarketplaceItemI18n = {
  [key in Language]: {
    title: string;
    description: string;
  }
};

export interface MarketplaceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  i18n?: MarketplaceItemI18n;
  author: string;
  category: string;
  tags?: string[];
  price: number; // Price in USD
  auctionEndDate?: Date; // Optional end date for auction
}

export type MarketplaceCategory = {
  id: string;
  slug: string;
  name: string;
  i18n: {
    [key in Language]: {
      name: string;
    }
  };
};

// Define marketplace categories that will be used as tabs
export const marketplaceCategories: MarketplaceCategory[] = [
  {
    id: "1",
    slug: "all",
    name: "All",
    i18n: {
      en: { name: "All" },
      uk: { name: "Всі" },
      ru: { name: "Все" },
      es: { name: "Todos" }
    }
  },
  {
    id: "2",
    slug: "telegram",
    name: "Telegram",
    i18n: {
      en: { name: "Telegram" },
      uk: { name: "Telegram" },
      ru: { name: "Telegram" },
      es: { name: "Telegram" }
    }
  }
];

// Updated marketplace items based on the new list
export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    slug: "case-404",
    title: "Дело №404",
    description: "Коллективное детективное расследование",
    i18n: {
      en: {
        title: "Case #404",
        description: "Collective detective investigation"
      },
      uk: {
        title: "Справа №404",
        description: "Колективне детективне розслідування"
      },
      ru: {
        title: "Дело №404",
        description: "Коллективное детективное расследование"
      },
      es: {
        title: "Caso #404",
        description: "Investigación detectivesca colectiva"
      }
    },
    author: "Telegram Labs",
    category: "telegram",
    tags: ["detective", "collective", "investigation", "interactive"],
    price: 3200
  },
  {
    id: "2",
    slug: "exchange-2077",
    title: "Биржа 2077",
    description: "Симулятор кибер-экономики",
    i18n: {
      en: {
        title: "Exchange 2077",
        description: "Cyber-economy simulator"
      },
      uk: {
        title: "Біржа 2077",
        description: "Симулятор кібер-економіки"
      },
      ru: {
        title: "Биржа 2077",
        description: "Симулятор кибер-экономики"
      },
      es: {
        title: "Bolsa 2077",
        description: "Simulador de ciber-economía"
      }
    },
    author: "CyberDev",
    category: "telegram",
    tags: ["economy", "cyber", "simulator", "game"],
    price: 4500
  },
  {
    id: "3",
    slug: "meme-forge",
    title: "Meme-Forge",
    description: "Фабрика мемов в реальном времени",
    i18n: {
      en: {
        title: "Meme-Forge",
        description: "Real-time meme factory"
      },
      uk: {
        title: "Meme-Forge",
        description: "Фабрика мемів у реальному часі"
      },
      ru: {
        title: "Meme-Forge",
        description: "Фабрика мемов в реальном времени"
      },
      es: {
        title: "Meme-Forge",
        description: "Fábrica de memes en tiempo real"
      }
    },
    author: "MemeTeam",
    category: "telegram",
    tags: ["memes", "real-time", "generator", "interactive"],
    price: 1800
  },
  {
    id: "4",
    slug: "pet-tamago",
    title: "Pet-Tamago",
    description: "Кибер-питомец канала",
    i18n: {
      en: {
        title: "Pet-Tamago",
        description: "Channel cyber-pet"
      },
      uk: {
        title: "Pet-Tamago",
        description: "Кібер-вихованець каналу"
      },
      ru: {
        title: "Pet-Tamago",
        description: "Кибер-питомец канала"
      },
      es: {
        title: "Pet-Tamago",
        description: "Cibermascota del canal"
      }
    },
    author: "Digital Pets",
    category: "telegram",
    tags: ["pet", "tamagotchi", "cyber", "interactive"],
    price: 2200
  },
  {
    id: "5",
    slug: "alternative-history-newspaper",
    title: "Газета альтернативной истории",
    description: "Утренние альтернативные новости с возможностью влиять на ход событий",
    i18n: {
      en: {
        title: "Alternative History Newspaper",
        description: "Morning alternative news with the ability to influence the course of events"
      },
      uk: {
        title: "Газета альтернативної історії",
        description: "Ранкові альтернативні новини з можливістю впливати на хід подій"
      },
      ru: {
        title: "Газета альтернативной истории",
        description: "Утренние альтернативные новости с возможностью влиять на ход событий"
      },
      es: {
        title: "Periódico de Historia Alternativa",
        description: "Noticias alternativas matutinas con la capacidad de influir en el curso de los eventos"
      }
    },
    author: "AlterMedia",
    category: "telegram",
    tags: ["news", "alternative", "interactive", "history"],
    price: 3800
  },
  {
    id: "6",
    slug: "flash-drop-club",
    title: "Flash Drop Club",
    description: "Канал мгновенных дропов с голосованием",
    i18n: {
      en: {
        title: "Flash Drop Club",
        description: "Instant drops channel with voting"
      },
      uk: {
        title: "Flash Drop Club",
        description: "Канал миттєвих дропів з голосуванням"
      },
      ru: {
        title: "Flash Drop Club",
        description: "Канал мгновенных дропов с голосованием"
      },
      es: {
        title: "Flash Drop Club",
        description: "Canal de lanzamientos instantáneos con votación"
      }
    },
    author: "DropMasters",
    category: "telegram",
    tags: ["drops", "voting", "instant", "club"],
    price: 2800
  },
  {
    id: "7",
    slug: "mind-maze-live",
    title: "Mind Maze Live",
    description: "Интерактивный побег из комнаты",
    i18n: {
      en: {
        title: "Mind Maze Live",
        description: "Interactive escape room"
      },
      uk: {
        title: "Mind Maze Live",
        description: "Інтерактивна кімната втечі"
      },
      ru: {
        title: "Mind Maze Live",
        description: "Интерактивный побег из комнаты"
      },
      es: {
        title: "Mind Maze Live",
        description: "Sala de escape interactiva"
      }
    },
    author: "EscapeGames",
    category: "telegram",
    tags: ["escape", "room", "puzzle", "interactive"],
    price: 3500
  },
  {
    id: "8",
    slug: "confession-cloud",
    title: "Confession Cloud",
    description: "Анонимные цепочки историй",
    i18n: {
      en: {
        title: "Confession Cloud",
        description: "Anonymous story chains"
      },
      uk: {
        title: "Confession Cloud",
        description: "Анонімні ланцюжки історій"
      },
      ru: {
        title: "Confession Cloud",
        description: "Анонимные цепочки историй"
      },
      es: {
        title: "Confession Cloud",
        description: "Cadenas de historias anónimas"
      }
    },
    author: "StoryTech",
    category: "telegram",
    tags: ["stories", "anonymous", "chains", "social"],
    price: 1950
  },
  {
    id: "9",
    slug: "trend-forecaster",
    title: "Trend Forecaster",
    description: "Коллективное предсказание хайпов",
    i18n: {
      en: {
        title: "Trend Forecaster",
        description: "Collective hype prediction"
      },
      uk: {
        title: "Trend Forecaster",
        description: "Колективне передбачення хайпів"
      },
      ru: {
        title: "Trend Forecaster",
        description: "Коллективное предсказание хайпов"
      },
      es: {
        title: "Trend Forecaster",
        description: "Predicción colectiva de tendencias"
      }
    },
    author: "TrendLabs",
    category: "telegram",
    tags: ["trends", "prediction", "collective", "social"],
    price: 2500
  },
  {
    id: "10",
    slug: "micro-master-mba",
    title: "Micro-Master MBA",
    description: "60-дневный курс микро-кейсов",
    i18n: {
      en: {
        title: "Micro-Master MBA",
        description: "60-day micro-case course"
      },
      uk: {
        title: "Micro-Master MBA",
        description: "60-денний курс мікро-кейсів"
      },
      ru: {
        title: "Micro-Master MBA",
        description: "60-дневный курс микро-кейсов"
      },
      es: {
        title: "Micro-Master MBA",
        description: "Curso de 60 días de micro-casos"
      }
    },
    author: "EduMasters",
    category: "telegram",
    tags: ["education", "mba", "course", "business"],
    price: 4800
  },
  {
    id: "11",
    slug: "influence-incubator",
    title: "Influence Incubator",
    description: "Крауд-кампания в реальном времени",
    i18n: {
      en: {
        title: "Influence Incubator",
        description: "Real-time crowd campaign"
      },
      uk: {
        title: "Influence Incubator",
        description: "Крауд-кампанія в реальному часі"
      },
      ru: {
        title: "Influence Incubator",
        description: "Крауд-кампания в реальном времени"
      },
      es: {
        title: "Influence Incubator",
        description: "Campaña colectiva en tiempo real"
      }
    },
    author: "InfluenceTeam",
    category: "telegram",
    tags: ["influence", "crowd", "campaign", "real-time"],
    price: 3700
  },
  {
    id: "12",
    slug: "nostalgia-rewind",
    title: "Nostalgia Rewind",
    description: "Ретро-кино по выбору зрителя",
    i18n: {
      en: {
        title: "Nostalgia Rewind",
        description: "Retro cinema by viewer's choice"
      },
      uk: {
        title: "Nostalgia Rewind",
        description: "Ретро-кіно за вибором глядача"
      },
      ru: {
        title: "Nostalgia Rewind",
        description: "Ретро-кино по выбору зрителя"
      },
      es: {
        title: "Nostalgia Rewind",
        description: "Cine retro a elección del espectador"
      }
    },
    author: "RetroTeam",
    category: "telegram",
    tags: ["cinema", "retro", "viewer", "nostalgia"],
    price: 2100
  }
]; 