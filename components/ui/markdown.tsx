import React from "react"

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function renderMarkdown(md: string): string {
  // extract fenced code blocks first
  const codeBlocks: { lang: string; code: string }[] = []
  let pre = md.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (_m, lang = "", code = "") => {
    const idx = codeBlocks.push({ lang, code }) - 1
    return `@@CODE_${idx}@@`
  })

  const safe = escapeHtml(pre)
  const lines = safe.split(/\r?\n/)
  const out: string[] = []
  let inList = false

  const flushList = () => {
    if (inList) {
      out.push("</ul>")
      inList = false
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (line.startsWith("## ")) {
      flushList()
      out.push(`<h2 class="font-semibold text-base sm:text-lg mb-1">${line.slice(3)}</h2>`)
      continue
    }
    if (line.startsWith("### ")) {
      flushList()
      out.push(`<h3 class="font-semibold text-sm sm:text-base mb-1">${line.slice(4)}</h3>`)
      continue
    }
    if (line.startsWith("- ")) {
      if (!inList) {
        out.push('<ul class="list-disc pl-5 space-y-1">')
        inList = true
      }
      const item = line.slice(2)
      out.push(`<li>${item}</li>`)
      continue
    }
    if (line === "") {
      flushList()
      out.push("<br/>")
      continue
    }
    // bold/italic/links/inline code
    let txt = line
    txt = txt.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    txt = txt.replace(/\*(.+?)\*/g, "<em>$1</em>")
    txt = txt.replace(/`([^`]+)`/g, '<code class="px-1 py-0.5 rounded bg-muted/30">$1</code>')
    txt = txt.replace(/\[([^\]]+)\]\((https?:[^\)]+)\)/g, '<a class="underline" href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    out.push(`<p>${txt}</p>`)
  }
  flushList()
  let html = out.join("")
  html = html.replace(/@@CODE_(\d+)@@/g, (_m, i) => {
    const b = codeBlocks[Number(i)]
    const codeEscaped = escapeHtml(b.code)
    const lang = b.lang ? `language-${b.lang}` : ""
    return `<pre class="rounded-md bg-muted/20 p-3 overflow-x-auto"><code class="${lang}">${codeEscaped}</code></pre>`
  })
  return html
}

export function Markdown({ content }: { content: string }) {
  const html = React.useMemo(() => renderMarkdown(content), [content])
  return <div className="prose prose-invert text-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}


