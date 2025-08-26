import { NextRequest } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { BlueprintRequest, Opportunity, QuestAnswer } from "@/lib/quest/schema"
import { contacts } from "@/lib/config/contacts"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as BlueprintRequest
    const answers: QuestAnswer[] = Array.isArray(body.answers) ? body.answers : []
    const opportunities: Opportunity[] = Array.isArray(body.opportunities) ? body.opportunities : []
    const locale = (body.locale || "en").toLowerCase()
    const title = body.title || (locale.startsWith("uk") ? "Blueprint Автоматизації" : locale.startsWith("ru") ? "Blueprint Автоматизации" : "Automation Blueprint")

    const pdf = await PDFDocument.create()
    const page = pdf.addPage([612, 792])
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
    let y = 760
    const margin = 48

    const draw = (text: string, size = 12, b = false, color = rgb(0.1,0.1,0.1)) => {
      const f = b ? bold : font
      page.drawText(text, { x: margin, y: y - size, size, font: f, color })
      y -= size + 6
    }

    draw(title, 22, true)
    draw(new Date().toLocaleString(locale.startsWith("uk") ? "uk" : locale.startsWith("ru") ? "ru" : "en"), 10)
    y -= 8
    draw(locale.startsWith("uk") ? "Вихідні відповіді" : locale.startsWith("ru") ? "Исходные ответы" : "Collected Answers", 16, true)
    answers.slice(0,30).forEach(a => {
      const val = String(a.value).slice(0,100)
      draw(`${a.id}: ${val}`, 10)
    })
    y -= 8
    draw(locale.startsWith("uk") ? "Можливості" : locale.startsWith("ru") ? "Возможности" : "Opportunities", 16, true)
    opportunities.slice(0,10).forEach((o,i) => {
      wrap(o.title + " – " + o.description, 80).forEach(line => draw(line, 11, i===0))
      draw(`HoursSaved: ${o.estHoursSaved} | Share: ${(o.automationShare*100).toFixed(0)}% | Complexity: ${o.complexity} | Confidence: ${(o.confidence*100).toFixed(0)}%`, 9)
      if (typeof o.monthlySavings === 'number') draw(`Monthly Savings (est): ${o.monthlySavings}`, 9)
      y -= 4
      if (y < 120) {
        y = 760
        // new page for overflow
      }
    })

    y -= 8
    draw(locale.startsWith("uk") ? "Контакти" : locale.startsWith("ru") ? "Контакты" : "Contact", 16, true)
    draw(`${contacts.name} - ${contacts.title}`, 11)
    draw(`Email: ${contacts.email}`, 10)
    if (contacts.website) draw(`Website: ${contacts.website}`, 10)

  const bytes = await pdf.save()
  // Return bytes directly (similar to ROI export route) casting to any to satisfy TS in edge cases
  return new Response(bytes as any, { status: 200, headers: { "Content-Type": "application/pdf", "Content-Disposition": "attachment; filename=automation-blueprint.pdf" } })
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error'}), { status:500, headers:{"Content-Type":"application/json"}})
  }
}

function wrap(text: string, width: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const next = line ? line + ' ' + w : w
    if (next.length > width) {
      if (line) lines.push(line)
      line = w
    } else line = next
  }
  if (line) lines.push(line)
  return lines
}
