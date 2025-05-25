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
  }
];