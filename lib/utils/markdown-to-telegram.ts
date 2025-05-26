/**
 * markdownToTelegram.ts
 * Конвертирует «GitHub-style» Markdown в Markdown V2 Telegram.
 * <https://core.telegram.org/bots/api#markdownv2-style>
 */

const TG_SPECIAL = /[_*\[\]()~`>#+\-=|{}.!]/g;
const esc       = (s: string) => s.replace(TG_SPECIAL, '\\$&');
const escCode   = (s: string) => s.replace(/([\\`])/g, '\\$1');

export function markdownToTelegram(md: string): string {
  if (!md) return '';
  let text = md.replace(/\r\n/g, '\n');

  /* ―― 1. Код-блоки ――――――――――――――――――――――――――――――――――――― */
  const blocks: string[] = [];
  text = text.replace(/```([\s\S]*?)```/g, (_, code) => {
    const id = blocks.push('```' + escCode(code) + '```') - 1;
    return `@@BLK${id}@@`;
  });

  /* ―― 2. Инлайн-код ――――――――――――――――――――――――――――――――― */
  const inlines: string[] = [];
  text = text.replace(/`([^`\n]+)`/g, (_, code) => {
    const id = inlines.push('`' + escCode(code) + '`') - 1;
    return `@@COD${id}@@`;
  });

  /* ―― 3. Универсальный плейсхолдер ――――――――――――――――― */
  const ph: string[] = [];
  const hold = (s: string) => {
    const id = ph.push(s) - 1;
    return `@@PH${id}@@`;
  };

  /* 3.1 Ссылки */
  text = text.replace(/\[([^\]]+)]\(([^)]+)\)/g,
    (match) => hold(match));

  /* 3.2 Изображения → alt-текст */
  text = text.replace(/!\[([^\]]*)]\([^)]+\)/g,
    (_, alt) => hold(esc(alt)));

  /* 3.3 Жирный (** или __) */
  text = text.replace(/(\*\*|__)([\s\S]+?)\1/g,
    (_, __, body) => hold('*' + esc(body) + '*'));

  /* 3.4 Курсив (* или _) */
  text = text.replace(/(\*|_)([\s\S]+?)\1/g,
    (_, __, body) => hold('_' + esc(body) + '_'));

  /* 3.5 Зачёркнутый ~~ */
  text = text.replace(/~~([\s\S]+?)~~/g,
    (_, body) => hold('~' + esc(body) + '~'));

  /* 3.6 Заголовки #…###### */
  text = text.replace(/^#{1,6}\s+(.+)$/gm,
    (_, h) => hold('*' + esc(h) + '*'));

  /* 3.7 Цитаты > … */
  text = text.replace(/^>\s?(.*)$/gm,
    (_, q) => hold('>' + esc(q)));

  /* 3.8 Буллет-списки -, *, + */
  text = text.replace(/^\s*[-*+]\s+/gm, '• ');

  /* ―― 4. Глобальное экранирование «фона» ――――――――――――― */
  text = esc(text);

  /* ―― 5. Возвращаем плейсхолдеры и код ―――――――――――――― */
  ph.forEach((v, i)      => text = text.replace(`@@PH${i}@@`,    v));
  inlines.forEach((v, i) => text = text.replace(`@@COD${i}@@`,   v));
  blocks.forEach((v, i)  => text = text.replace(`@@BLK${i}@@`,   v));

  /* ―― 6. Чистим 3+ пустых строк ――――――――――――――――――――― */
  text = text.replace(/\n{3,}/g, '\n\n');

  return text.trim();
}
