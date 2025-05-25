/**
 * Markdown / HTML → максимально «чистый» plain-текст.
 * ▸ Все ссылки удаляются целиком (якорь + URL).
 * ▸ Нумерованные списки (1. 2. …) сохраняются.
 * ▸ Буллеты -, *, + срезаются, но текст остаётся.
 * ▸ Абзацы, отступы и эмодзи не портятся.
 */

export function markdownToPlainText(src: string): string {
    if (!src) return '';
  
    let text = src;
  
    /* 1. YAML-front-matter  --- … --- */
    text = text.replace(/^-{3}[\s\S]*?^-{3}\s*/m, '');
  
    /* 2. Fenced-code-blocks  ``` … ```  или  ~~~ … ~~~ */
    text = text.replace(/```[\s\S]*?```|~~~[\s\S]*?~~~/g, '');
  
    /* 3. Инлайн-код `code` / ``code`` */
    text = text.replace(/`{1,3}([^`]+?)`{1,3}/g, '$1');
  
    /* 4. Картинки  ![alt](url)  →  alt */
    text = text.replace(/!\[([^\]]*)]\([^)]+\)/g, '$1');
  
    /* 5. Markdown-ссылки  [anchor](url)  →  ⌀ */
    text = text.replace(/\[[^\]]+]\([^)]+\)/g, '');
  
    /* 6. HTML-якоря  <a …>anchor</a>  →  ⌀ */
    text = text.replace(/<a\b[^>]*>[\s\S]*?<\/a>/gi, '');
  
    /* 7. Автоссылки  <http://…>  и сырые URL */
    text = text.replace(/<https?:\/\/[^>]+>/gi, '');
    text = text.replace(/https?:\/\/[^\s)]+/gi, '');
  
    /* 8. Жирный / курсив / зачёркнутый — раскрываем, не удаляем текст */
    text = text
      .replace(/(\*\*|__)(.*?)\1/g, '$2')
      .replace(/(\*|_)(.*?)\1/g, '$2')
      .replace(/~~(.*?)~~/g, '$1');
  
    /* 9. Заголовки  # …  → текст без # */
    text = text.replace(/^#{1,6}\s+(.*)/gm, '$1');
  
    /* 10. Блок-цитаты  > … */
    text = text.replace(/^\s*>\s?/gm, '');
  
    /* 11. Списки */
    /*    ─ Буллет-маркеры -, *, + удаляем, текст оставляем            */
    /*    ─ Нумерованные 1. 2. … сохраняем как есть                    */
    text = text.replace(/^\s*[-*+]\s+/gm, '');
  
    /* 12. Горизонтальные правила ***, ---, ___ */
    text = text.replace(/^\s*(\*|-|_){3,}\s*$/gm, '');
  
    /* 13. Таблицы  | a | b |  →  a b */
    text = text.replace(
      /^\s*\|(.+)\|\s*$/gm,
      (_, row: string) => row.trim().replace(/\s*\|\s*/g, ' ')
    );
  
    /* 14. Прочие HTML-теги */
    text = text.replace(/<\/?[^>]+>/g, '');
  
    /* 15. Удаляем ТОЛЬКО хвостовые пробелы в строках */
    text = text.replace(/[ \t]+$/gm, '');
  
    /* 16. 3+ пустых строк → 2 (для читаемости) */
    text = text.replace(/\n{3,}/g, '\n\n');
  
    return text.trim();
  }
  