import { Language } from "./i18n/translations";

export type FunctionCardI18n = {
  [key in Language]: {
    title: string;
    description: string;
  }
};

export interface FunctionCard {
  id: string;
  slug: string;
  title: string;
  description: string;
  i18n?: FunctionCardI18n;
  likes: number;
  tags?: string[];
}

export const functionCards: FunctionCard[] = [
  {
    id: "1",
    slug: "text-pure",
    title: "TextPure",
    description: "Transform text between different formats and markup types",
    i18n: {
      uk: {
        title: "TextPure",
        description: "Трансформує текст між різними форматами та типами розмітки"
      },
      ru: {
        title: "TextPure",
        description: "Трансформирует текст между различными форматами и типами разметки"
      },
      es: {
        title: "TextPure",
        description: "Transforma texto entre diferentes formatos y tipos de marcado"
      },
      en: {
        title: "TextPure",
        description: "Transform text between different formats and markup types"
      }
    },
    likes: 0,
    tags: ["text", "markdown", "html", "formatting"]
  },
  {
    id: "2",
    slug: "codex-prompt-forge",
    title: "Codex Prompt Forge",
    description: "Create perfect prompts for code generation and programming tasks",
    i18n: {
      uk: {
        title: "Codex Prompt Forge",
        description: "Створює ідеальні промпти для генерації коду та завдань з програмування"
      },
      ru: {
        title: "Codex Prompt Forge",
        description: "Создает идеальные промпты для генерации кода и задач программирования"
      },
      es: {
        title: "Codex Prompt Forge",
        description: "Crea prompts perfectos para generación de código y tareas de programación"
      },
      en: {
        title: "Codex Prompt Forge",
        description: "Create perfect prompts for code generation and programming tasks"
      }
    },
    likes: 0,
    tags: ["ai", "prompt-engineering", "coding", "programming"]
  },
  {
    id: "3",
    slug: "random-yes-no",
    title: "Yes/No",
    description: "Generate a random Yes or No after a countdown",
    i18n: {
      en: {
        title: "Yes/No",
        description: "Generate a random Yes or No after a countdown"
      },
      uk: {
        title: "Так/Ні",
        description: "Генерує випадковий Так або Ні після зворотного відліку"
      },
      ru: {
        title: "Да/Нет",
        description: "Генерирует случайное Да или Нет после обратного отсчета"
      },
      es: {
        title: "Sí/No",
        description: "Genera un Sí o No al azar después de una cuenta regresiva"
      }
    },
    likes: 0,
    tags: ["decision", "random", "yes-no", "timer"]
  },
  {
    id: "4",
    slug: "countdown-timer",
    title: "Countdown Timer",
    description: "Track time remaining until a specific date and time",
    i18n: {
      en: {
        title: "Countdown Timer",
        description: "Track time remaining until a specific date and time"
      },
      uk: {
        title: "Зворотний відлік",
        description: "Відстежуйте час, що залишився до конкретної дати та часу"
      },
      ru: {
        title: "Обратный отсчет",
        description: "Отслеживайте оставшееся время до определенной даты и времени"
      },
      es: {
        title: "Cuenta Regresiva",
        description: "Seguimiento del tiempo restante hasta una fecha y hora específicas"
      }
    },
    likes: 0,
    tags: ["timer", "countdown", "deadline", "event"]
  },
  {
    id: "5",
    slug: "utm-builder-parser",
    title: "UTM Builder ↔ Parser",
    description: "Create and analyze UTM-tagged URLs for marketing campaigns",
    i18n: {
      en: {
        title: "UTM Builder ↔ Parser",
        description: "Create and analyze UTM-tagged URLs for marketing campaigns"
      },
      uk: {
        title: "UTM Конструктор ↔ Аналізатор",
        description: "Створюйте та аналізуйте URL з UTM-мітками для маркетингових кампаній"
      },
      ru: {
        title: "UTM Конструктор ↔ Анализатор",
        description: "Создавайте и анализируйте URL с UTM-метками для маркетинговых кампаний"
      },
      es: {
        title: "Constructor ↔ Analizador UTM",
        description: "Cree y analice URLs con etiquetas UTM para campañas de marketing"
      }
    },
    likes: 0,
    tags: ["utm", "marketing", "url", "tracking"]
  },
  {
    id: "6",
    slug: "color-contrast-checker",
    title: "Color Contrast Checker",
    description: "Check color contrast for WCAG accessibility compliance",
    i18n: {
      en: {
        title: "Color Contrast Checker",
        description: "Check color contrast for WCAG accessibility compliance"
      },
      uk: {
        title: "Перевірка Контрастності",
        description: "Перевірка контрасту кольорів на відповідність доступності WCAG"
      },
      ru: {
        title: "Проверка Контрастности",
        description: "Проверка контраста цветов на соответствие доступности WCAG"
      },
      es: {
        title: "Verificador de Contraste",
        description: "Compruebe el contraste de color para el cumplimiento de accesibilidad WCAG"
      }
    },
    likes: 0,
    tags: ["accessibility", "wcag", "color", "contrast", "design"]
  },
  {
    id: "7",
    slug: "markdown-slides",
    title: "Markdown → Slides",
    description: "Create presentation slides from Markdown text instantly",
    i18n: {
      en: {
        title: "Markdown → Slides",
        description: "Create presentation slides from Markdown text instantly"
      },
      uk: {
        title: "Markdown → Слайди",
        description: "Миттєве створення презентаційних слайдів з тексту Markdown"
      },
      ru: {
        title: "Markdown → Слайды",
        description: "Мгновенное создание презентационных слайдов из текста Markdown"
      },
      es: {
        title: "Markdown → Diapositivas",
        description: "Cree diapositivas de presentación a partir de texto Markdown al instante"
      }
    },
    likes: 0,
    tags: ["markdown", "presentation", "slides", "meeting"]
  },
  {
    id: "8",
    slug: "timezone-meeting-planner",
    title: "Timezone Meeting Planner",
    description: "Plan meetings across different timezones with an interactive slider",
    i18n: {
      en: {
        title: "Timezone Meeting Planner",
        description: "Plan meetings across different timezones with an interactive slider"
      },
      uk: {
        title: "Планувальник зустрічей за часовими поясами",
        description: "Планування зустрічей у різних часових поясах за допомогою інтерактивного повзунка"
      },
      ru: {
        title: "Планировщик встреч по часовым поясам",
        description: "Планирование встреч в разных часовых поясах с помощью интерактивного ползунка"
      },
      es: {
        title: "Planificador de reuniones por zona horaria",
        description: "Planifique reuniones en diferentes zonas horarias con un control deslizante interactivo"
      }
    },
    likes: 0,
    tags: ["timezone", "meeting", "planner", "international", "time"]
  },
  {
    id: "9",
    slug: "commit-message-linter",
    title: "Commit Message Linter",
    description: "Create perfect conventional commit messages with live validation",
    i18n: {
      en: {
        title: "Commit Message Linter",
        description: "Create perfect conventional commit messages with live validation"
      },
      uk: {
        title: "Валідатор повідомлень комітів",
        description: "Створюйте ідеальні повідомлення комітів з миттєвою перевіркою"
      },
      ru: {
        title: "Валидатор сообщений коммитов",
        description: "Создавайте идеальные сообщения коммитов с мгновенной проверкой"
      },
      es: {
        title: "Validador de mensajes de commit",
        description: "Cree mensajes de commit perfectos con validación en tiempo real"
      }
    },
    likes: 0,
    tags: ["git", "commit", "linter", "conventional-commits", "developer"]
  }
];