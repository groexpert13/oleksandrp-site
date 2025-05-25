/**
 * Text transformation utilities for various formats
 */

export enum TextTransformationType {
  MARKDOWN_TO_PLAIN = 'markdown-to-plain',
  PLAIN_TO_HTML_EMAIL = 'plain-to-html-email',
  PLAIN_TO_OG = 'plain-to-og',
  PLAIN_TO_SSML = 'plain-to-ssml',
  SMART_TYPOGRAPHY = 'smart-typography',
  PLAIN_TO_JSON_YAML = 'plain-to-json-yaml'
}

/**
 * Cleans text from formatting symbols
 * @param text The text to clean
 * @returns Cleaned text
 */
export function cleanText(text: string): string {
  if (!text) return '';
  
  // Remove common formatting characters
  return text
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    // Remove special formatting characters
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    // Remove extra spaces
    .replace(/\s+/g, ' ')
    // Remove zero-width spaces and similar
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    // Trim whitespace
    .trim();
}

/**
 * Convert Markdown to plain text
 */
export function markdownToPlainText(text: string): string {
  if (!text) return '';
  
  return text
    // Remove headers: # Header => Header
    .replace(/^#+\s+/gm, '')
    // Remove bold/italic: **bold** => bold, *italic* => italic
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    // Remove backticks: `code` => code
    .replace(/`([^`]*)`/g, '$1')
    // Convert links: [text](url) => text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Convert list items: - item => item, * item => item, 1. item => item
    .replace(/^[\s-*]*\s*|\d+\.\s*/gm, '')
    // Clean up extra spacing
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert plain text to HTML email template
 */
export function plainToHtmlEmail(text: string): string {
  if (!text) return '';
  
  const lines = text.split('\n');
  let html = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
  html += '<style>\n';
  html += 'body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }\n';
  html += 'h1 { color: #2c3e50; font-size: 24px; margin-top: 30px; margin-bottom: 15px; }\n';
  html += 'p { margin-bottom: 15px; }\n';
  html += 'ul { padding-left: 20px; }\n';
  html += 'li { margin-bottom: 8px; }\n';
  html += '</style>\n</head>\n<body>\n';
  
  let inList = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '') continue;
    
    // Check if this is a heading (assume lines that are shorter and end with no punctuation are headings)
    if (line.length < 70 && !line.match(/[,.;:]$/)) {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<h1>${line}</h1>\n`;
    } 
    // Check if this might be a list item (starts with - or *)
    else if (line.match(/^[-*•]\s/)) {
      if (!inList) {
        html += '<ul>\n';
        inList = true;
      }
      html += `<li>${line.replace(/^[-*•]\s/, '')}</li>\n`;
    } 
    // Regular paragraph
    else {
      if (inList) {
        html += '</ul>\n';
        inList = false;
      }
      html += `<p>${line}</p>\n`;
    }
  }
  
  if (inList) {
    html += '</ul>\n';
  }
  
  html += '</body>\n</html>';
  return html;
}

/**
 * Convert plain text to Open Graph meta tags
 */
export function plainToOg(text: string): string {
  if (!text) return '';
  
  const lines = text.split('\n');
  let title = '';
  let description = '';
  
  // First non-empty line is the title
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '') {
      title = lines[i].trim();
      break;
    }
  }
  
  // Concatenate the rest for description, limit to ~200 chars
  description = lines.slice(1).join(' ').trim();
  if (description.length > 200) {
    description = description.substring(0, 197) + '...';
  }
  
  let ogTags = '<meta property="og:type" content="website" />\n';
  ogTags += `<meta property="og:title" content="${escapeHtml(title)}" />\n`;
  ogTags += `<meta property="og:description" content="${escapeHtml(description)}" />\n`;
  ogTags += '<meta property="og:image" content="https://example.com/image.jpg" />\n';
  ogTags += '<meta property="og:url" content="https://example.com/page" />\n\n';
  
  ogTags += '<meta name="twitter:card" content="summary_large_image">\n';
  ogTags += `<meta name="twitter:title" content="${escapeHtml(title)}">\n`;
  ogTags += `<meta name="twitter:description" content="${escapeHtml(description)}">\n`;
  ogTags += '<meta name="twitter:image" content="https://example.com/image.jpg">\n';
  
  return ogTags;
}

/**
 * Convert plain text to SSML for voice assistants
 */
export function plainToSsml(text: string): string {
  if (!text) return '';
  
  const lines = text.split('\n');
  let ssml = '<speak>\n';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line === '') {
      ssml += '<break time="500ms"/>\n';
      continue;
    }
    
    // Check if this might be a heading
    if (line.length < 70 && !line.match(/[,.;:]$/)) {
      ssml += `<emphasis level="strong">${escapeXml(line)}</emphasis>\n`;
      ssml += '<break time="700ms"/>\n';
    } 
    // Check if this might be a question
    else if (line.endsWith('?')) {
      ssml += `<prosody rate="95%" pitch="+5%">${escapeXml(line)}</prosody>\n`;
      ssml += '<break time="600ms"/>\n';
    }
    // Regular paragraph
    else {
      // Add pauses at commas and periods
      let processedLine = escapeXml(line)
        .replace(/,/g, ',<break time="200ms"/>')
        .replace(/\./g, '.<break time="400ms"/>');
      
      ssml += `${processedLine}\n`;
      ssml += '<break time="500ms"/>\n';
    }
  }
  
  ssml += '</speak>';
  return ssml;
}

/**
 * Apply smart typography rules
 */
export function smartTypography(text: string): string {
  if (!text) return '';
  
  return text
    // Convert straight single quotes to smart single quotes
    .replace(/(^|[-—\s(\[\"])'/g, '$1‘')
    .replace(/'/g, '’')
    // Convert straight double quotes to smart double quotes
    .replace(/(^|[-—/\[(\s])"/g, '$1"')
    .replace(/"/g, '"')
    // Convert triple dots to ellipsis
    .replace(/\.{3}/g, '…')
    // Convert double hyphens to em-dash
    .replace(/--/g, '—')
    // Add non-breaking spaces before specific punctuation marks
    .replace(/ ([!?:;%])/g, '\u00A0$1')
    // Non-breaking space between number and unit
    .replace(/(\d+) ([a-zA-Z]+)/g, '$1\u00A0$2')
    // Clean up spacing
    .replace(/ +/g, ' ')
    .trim();
}

/**
 * Convert plain text to JSON/YAML structure
 */
export function plainToJsonYaml(text: string, format: 'json' | 'yaml' = 'yaml'): string {
  if (!text) return '';
  
  const lines = text.split('\n');
  let title = '';
  const paragraphs: string[] = [];
  const listItems: string[] = [];
  
  // First non-empty line is the title
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() !== '') {
      title = lines[i].trim();
      break;
    }
  }
  
  // Process remaining lines
  let currentParagraph = '';
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Potential list item
    if (line.match(/^[-*•]\s/)) {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
      listItems.push(line.replace(/^[-*•]\s/, ''));
    } 
    // Empty line - paragraph break
    else if (line === '') {
      if (currentParagraph) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
    }
    // Continue paragraph
    else if (line !== title) {
      if (currentParagraph) {
        currentParagraph += ' ' + line;
      } else {
        currentParagraph = line;
      }
    }
  }
  
  // Add final paragraph if exists
  if (currentParagraph) {
    paragraphs.push(currentParagraph);
  }
  
  // Build output in requested format
  if (format === 'json') {
    const result = {
      title,
      paragraphs,
      list: listItems.length > 0 ? listItems : undefined
    };
    return JSON.stringify(result, null, 2);
  } else {
    // YAML format
    let yaml = `title: "${escapeYaml(title)}"\n`;
    
    if (paragraphs.length > 0) {
      yaml += 'paragraphs:\n';
      paragraphs.forEach(p => {
        yaml += `  - "${escapeYaml(p)}"\n`;
      });
    }
    
    if (listItems.length > 0) {
      yaml += 'list:\n';
      listItems.forEach(item => {
        yaml += `  - "${escapeYaml(item)}"\n`;
      });
    }
    
    return yaml;
  }
}

/**
 * Process text based on the selected transformation type
 */
export function transformText(text: string, type: TextTransformationType): string {
  switch (type) {
    case TextTransformationType.MARKDOWN_TO_PLAIN:
      return markdownToPlainText(text);
    case TextTransformationType.PLAIN_TO_HTML_EMAIL:
      return plainToHtmlEmail(text);
    case TextTransformationType.PLAIN_TO_OG:
      return plainToOg(text);
    case TextTransformationType.PLAIN_TO_SSML:
      return plainToSsml(text);
    case TextTransformationType.SMART_TYPOGRAPHY:
      return smartTypography(text);
    case TextTransformationType.PLAIN_TO_JSON_YAML:
      return plainToJsonYaml(text);
    default:
      return cleanText(text);
  }
}

/**
 * Helper: Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper: Escape XML special characters for SSML
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Helper: Escape YAML special characters
 */
function escapeYaml(text: string): string {
  return text
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n');
}

/**
 * Search functionality for filtering function cards
 */
export function searchFunctions(query: string, items: any[]): any[] {
  if (!query) return items;
  
  const lowercaseQuery = query.toLowerCase();
  
  return items.filter((item) => 
    item.title.toLowerCase().includes(lowercaseQuery) || 
    item.description.toLowerCase().includes(lowercaseQuery)
  );
}