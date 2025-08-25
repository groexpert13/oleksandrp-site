import React from "react"

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
}

function renderBasicMarkdown(md: string): string {
  const safe = escapeHtml(md)
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
    // bold **text**
    const bolded = line.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    out.push(`<p>${bolded}</p>`)
  }
  flushList()
  return out.join("")
}

export function Markdown({ content }: { content: string }) {
  const html = React.useMemo(() => renderBasicMarkdown(content), [content])
  return <div className="prose prose-invert text-sm max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
}


