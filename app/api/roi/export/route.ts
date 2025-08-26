import { NextRequest } from "next/server"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { contacts } from "@/lib/config/contacts"

export const runtime = "nodejs"

type Inputs = {
  hoursPerMonth: number
  hourlyRate: number
  automationShare: number
  implementationCost: number
  months?: number
  locale?: "en" | "uk" | "ru"
}

type Result = {
  monthlySavings: number
  paybackMonths: number
  series: { month: number; cumulative: number }[]
  narrative?: string
}

export async function POST(req: NextRequest) {
  try {
    const { inputs, result, personaPlan } = (await req.json()) as {
      inputs: Inputs
      result: Result
      personaPlan?: string
    }

    if (!inputs || !result) {
      return new Response(JSON.stringify({ error: "Missing inputs or result" }), { status: 400 })
    }

    const pdf = await PDFDocument.create()
    const page = pdf.addPage([612, 792]) // US Letter portrait
    const { width } = page.getSize()
    const margin = 48
    const contentWidth = width - margin * 2
    const font = await pdf.embedFont(StandardFonts.Helvetica)
    const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

    let cursorY = 792 - margin

    const drawText = (text: string, opts?: { size?: number; bold?: boolean; color?: { r: number; g: number; b: number } }) => {
      const size = opts?.size ?? 14
      const usedFont = opts?.bold ? fontBold : font
      const color = opts?.color ? rgb(opts.color.r, opts.color.g, opts.color.b) : rgb(0.1, 0.1, 0.1)
      page.drawText(text, { x: margin, y: cursorY - size, size, font: usedFont, color })
      cursorY -= size + 8
    }

    const formatCurrency = (n: number) => {
      try {
        return new Intl.NumberFormat(inputs.locale || "en", { style: "currency", currency: inputs.locale === "uk" ? "UAH" : "USD", maximumFractionDigits: 0 }).format(n)
      } catch {
        return `$${Math.round(n).toLocaleString()}`
      }
    }

    // Header
    drawText("ROI Simulation Report", { size: 22, bold: true })
    drawText(new Date().toLocaleString(inputs.locale || "en"), { size: 10, color: { r: 0.4, g: 0.4, b: 0.4 } })
    cursorY -= 8
    
    // Inputs
    drawText("Inputs", { size: 16, bold: true })
    drawText(`Hours per month: ${inputs.hoursPerMonth}`)
    drawText(`Hourly rate: ${formatCurrency(inputs.hourlyRate)}/h`)
    drawText(`Automation share: ${(inputs.automationShare * 100).toFixed(0)}%`)
    drawText(`Implementation cost: ${formatCurrency(inputs.implementationCost)}`)
    cursorY -= 8

    // Results
    drawText("Results", { size: 16, bold: true })
    drawText(`Monthly savings: ${formatCurrency(result.monthlySavings)}`)
    drawText(`Payback: ${result.paybackMonths} month(s)`)

    // Simple chart: cumulative bar (text-based fallback)
    cursorY -= 8
    drawText("Cumulative savings (first 12 months)", { size: 12, bold: true })
    const series = (result.series || []).slice(0, 12)
    const maxAbs = Math.max(1, ...series.map(s => Math.abs(s.cumulative)))
    const barArea = contentWidth
    for (const s of series) {
      const label = `Month ${s.month}`
      const barLength = Math.max(2, Math.round((Math.max(0, s.cumulative) / maxAbs) * (barArea * 0.7)))
      drawText(`${label}: ${"=".repeat(Math.min(60, barLength / 6))} ${formatCurrency(s.cumulative)}`, { size: 10 })
    }

    // Narrative / Plan
    cursorY -= 8
    if (result.narrative) {
      drawText("Summary", { size: 16, bold: true })
      const paragraphs = result.narrative.split(/\n+/)
      for (const p of paragraphs) {
        wrapText(p, 90).forEach(line => drawText(line, { size: 12 }))
      }
    }
    if (personaPlan) {
      cursorY -= 8
      drawText("Proposed plan", { size: 16, bold: true })
      wrapText(personaPlan, 90).forEach(line => drawText(line, { size: 12 }))
    }

    // Contact footer
    cursorY -= 16
    drawText("Contact", { size: 16, bold: true })
    drawText(`${contacts.name} - ${contacts.title}`, { size: 12 })
    drawText(`Email: ${contacts.email}`, { size: 10 })
    if (contacts.phone) drawText(`Phone: ${contacts.phone}`, { size: 10 })
    if (contacts.telegram) drawText(`Telegram: ${contacts.telegram}`, { size: 10 })
    if (contacts.website) drawText(`Website: ${contacts.website}`, { size: 10 })

    const bytes = await pdf.save()
    // Return Uint8Array directly to avoid Buffer issues in some runtimes
    return new Response(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=roi-report.pdf",
        "Cache-Control": "public, max-age=600",
      },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error", detail: e?.stack || String(e) }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let line = ""
  for (const w of words) {
    const next = line ? line + " " + w : w
    if (next.length > maxChars) {
      if (line) lines.push(line)
      line = w
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}


