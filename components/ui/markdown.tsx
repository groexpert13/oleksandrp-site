import React from "react"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"
import { Copy, Check } from "lucide-react"

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }
  
  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-background/80 hover:bg-background border border-border/50 transition-colors"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-500" />
      ) : (
        <Copy className="h-3.5 w-3.5 text-muted-foreground" />
      )}
    </button>
  )
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function getLanguageName(lang: string): string {
  const langMap: Record<string, string> = {
    js: 'JavaScript',
    jsx: 'JSX', 
    ts: 'TypeScript',
    tsx: 'TSX',
    py: 'Python',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    cs: 'C#',
    php: 'PHP',
    rb: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    swift: 'Swift',
    kt: 'Kotlin',
    sql: 'SQL',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    sass: 'Sass',
    json: 'JSON',
    xml: 'XML',
    yaml: 'YAML',
    yml: 'YAML',
    md: 'Markdown',
    bash: 'Bash',
    sh: 'Shell',
    powershell: 'PowerShell',
    dockerfile: 'Dockerfile',
    r: 'R',
    matlab: 'MATLAB',
    scala: 'Scala',
    perl: 'Perl',
    lua: 'Lua',
    dart: 'Dart',
    vue: 'Vue',
    svelte: 'Svelte'
  }
  return langMap[lang.toLowerCase()] || lang.toUpperCase()
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const codeRef = React.useRef<HTMLElement>(null)
  
  React.useEffect(() => {
    if (codeRef.current) {
      try {
        hljs.highlightElement(codeRef.current)
      } catch (e) {
        console.error('Syntax highlighting failed:', e)
      }
    }
  }, [code, language])
  
  return (
    <div className="relative group">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/40 border-b border-border/20 rounded-t-md">
        <span className="text-xs font-medium text-muted-foreground">
          {language ? getLanguageName(language) : 'Code'}
        </span>
        <CopyButton code={code} />
      </div>
      <pre className="bg-muted/10 border border-t-0 border-border/20 rounded-b-md p-3 overflow-x-auto">
        <code 
          ref={codeRef} 
          className={language ? `language-${language}` : ''}
        >
          {code}
        </code>
      </pre>
    </div>
  )
}

interface MarkdownElement {
  type: 'paragraph' | 'heading2' | 'heading3' | 'list' | 'codeblock' | 'break'
  content?: string
  level?: number
  items?: string[]
  code?: string
  language?: string
}

function parseMarkdown(md: string): MarkdownElement[] {
  const elements: MarkdownElement[] = []
  
  // First, extract code blocks
  const codeBlocks: { lang: string; code: string }[] = []
  let textWithPlaceholders = md.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (_m, lang = "", code = "") => {
    const idx = codeBlocks.push({ lang, code }) - 1
    return `@@CODE_${idx}@@`
  })

  const lines = textWithPlaceholders.split(/\r?\n/)
  let i = 0
  
  while (i < lines.length) {
    const line = lines[i].trimEnd()
    
    if (line.startsWith("## ")) {
      elements.push({ type: 'heading2', content: line.slice(3) })
    } else if (line.startsWith("### ")) {
      elements.push({ type: 'heading3', content: line.slice(4) })
    } else if (line.startsWith("- ")) {
      // Collect all list items
      const items: string[] = []
      while (i < lines.length && lines[i].trimEnd().startsWith("- ")) {
        items.push(lines[i].trimEnd().slice(2))
        i++
      }
      i-- // Back up one since the loop will increment
      elements.push({ type: 'list', items })
    } else if (line === "") {
      elements.push({ type: 'break' })
    } else if (line.startsWith("@@CODE_")) {
      const match = line.match(/@@CODE_(\d+)@@/)
      if (match) {
        const codeBlock = codeBlocks[Number(match[1])]
        elements.push({ 
          type: 'codeblock', 
          code: codeBlock.code,
          language: codeBlock.lang 
        })
      }
    } else if (line) {
      elements.push({ type: 'paragraph', content: line })
    }
    
    i++
  }
  
  return elements
}

function formatInlineText(text: string): React.ReactNode {
  // Process bold, italic, links, and inline code
  const parts = []
  let remaining = text
  let key = 0
  
  while (remaining) {
    // Bold
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    if (boldMatch) {
      const before = remaining.substring(0, boldMatch.index)
      if (before) parts.push(before)
      parts.push(<strong key={key++}>{boldMatch[1]}</strong>)
      remaining = remaining.substring((boldMatch.index || 0) + boldMatch[0].length)
      continue
    }
    
    // Italic
    const italicMatch = remaining.match(/\*(.+?)\*/)
    if (italicMatch) {
      const before = remaining.substring(0, italicMatch.index)
      if (before) parts.push(before)
      parts.push(<em key={key++}>{italicMatch[1]}</em>)
      remaining = remaining.substring((italicMatch.index || 0) + italicMatch[0].length)
      continue
    }
    
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/)
    if (codeMatch) {
      const before = remaining.substring(0, codeMatch.index)
      if (before) parts.push(before)
      parts.push(
        <code key={key++} className="px-1 py-0.5 rounded bg-muted/30 text-sm">
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.substring((codeMatch.index || 0) + codeMatch[0].length)
      continue
    }
    
    // Links
    const linkMatch = remaining.match(/\[([^\]]+)\]\((https?:[^\)]+)\)/)
    if (linkMatch) {
      const before = remaining.substring(0, linkMatch.index)
      if (before) parts.push(before)
      parts.push(
        <a key={key++} className="underline text-primary hover:text-primary/80" href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
          {linkMatch[1]}
        </a>
      )
      remaining = remaining.substring((linkMatch.index || 0) + linkMatch[0].length)
      continue
    }
    
    // No more matches, add remaining text
    parts.push(remaining)
    break
  }
  
  return parts
}

export function Markdown({ content }: { content: string }) {
  const elements = React.useMemo(() => parseMarkdown(content), [content])
  
  return (
    <div className="prose prose-invert text-sm max-w-none space-y-3">
      {elements.map((element, index) => {
        switch (element.type) {
          case 'heading2':
            return (
              <h2 key={index} className="font-semibold text-base sm:text-lg mb-1">
                {formatInlineText(element.content!)}
              </h2>
            )
          case 'heading3':
            return (
              <h3 key={index} className="font-semibold text-sm sm:text-base mb-1">
                {formatInlineText(element.content!)}
              </h3>
            )
          case 'list':
            return (
              <ul key={index} className="list-disc pl-5 space-y-1">
                {element.items!.map((item, itemIndex) => (
                  <li key={itemIndex}>{formatInlineText(item)}</li>
                ))}
              </ul>
            )
          case 'codeblock':
            return (
              <CodeBlock 
                key={index} 
                code={element.code!} 
                language={element.language!} 
              />
            )
          case 'break':
            return <br key={index} />
          case 'paragraph':
            return (
              <p key={index} className="leading-relaxed">
                {formatInlineText(element.content!)}
              </p>
            )
          default:
            return null
        }
      })}
    </div>
  )
}


