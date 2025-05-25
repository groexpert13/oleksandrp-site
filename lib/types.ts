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
    likes: 127
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
    likes: 93
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
    likes: 0
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
    likes: 0
  }
];