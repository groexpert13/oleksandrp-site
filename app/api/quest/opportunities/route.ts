import { NextRequest } from "next/server"
import { GenerateOpportunitiesRequest, GenerateOpportunitiesResponse, Opportunity } from "@/lib/quest/schema"
import { questPrompts } from "@/lib/quest/prompts"

export const runtime = "nodejs"

const FALLBACK: Opportunity[] = [
  {
    id: "email-routing",
    title: "Email Routing",
    description: "Автоматизировать классификацию входящих писем и маршрутизацию",
    estHoursSaved: 25,
    automationShare: 0.7,
    complexity: 2,
    confidence: 0.6,
  },
  {
    id: "report-gen",
    title: "Report Generation",
    description: "Сбор данных и автогенерация еженедельных отчётов",
    estHoursSaved: 15,
    automationShare: 0.8,
    complexity: 2,
    confidence: 0.65,
  },
  {
    id: "crm-data-clean",
    title: "CRM Data Clean",
    description: "Очистка/обогащение CRM записей через AI",
    estHoursSaved: 12,
    automationShare: 0.6,
    complexity: 3,
    confidence: 0.55,
  },
]

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateOpportunitiesRequest
    const answers = Array.isArray(body.answers) ? body.answers.slice(0, 30) : []
    const hourlyRate = typeof body.hourlyRate === "number" && body.hourlyRate > 0 ? body.hourlyRate : 30
    const locale = (body.locale || "en").toLowerCase()
    const apiKey = process.env.OPENAI_API_KEY || (process.env as any).OPENAI_API
    const model = process.env.OPENAI_RESPONSES_MODEL || "gpt-4o-mini"

    // Minimal sanitization of answers for prompt
    const compactAnswers = answers.map(a => ({ id: a.id, value: a.value }))

    if (!apiKey) {
      const enriched = FALLBACK.map(o => ({ ...o, monthlySavings: Math.round(o.estHoursSaved * hourlyRate * o.automationShare) }))
      const resp: GenerateOpportunitiesResponse = { opportunities: enriched, fallback: true }
      return json(resp)
    }

  const sysLocale = locale.startsWith("uk") ? "uk" : locale.startsWith("ru") ? "ru" : "en"
  const system = questPrompts.opportunities({ locale: sysLocale }) + `\nCRITICAL: Respond strictly in ${sysLocale}. Do not mix languages.`
  const user = questPrompts.opportunitiesUser(compactAnswers)

    let opportunities: Opportunity[] = []
    let fallback = false
    try {
      const r = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, input: [ { role: "system", content: system }, { role: "user", content: user } ], stream: false })
      })
      if (!r.ok) throw new Error(await r.text())
      const jr = await r.json()
      let raw = jr?.output?.[0]?.content?.[0]?.text || ""
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed?.opportunities)) {
        opportunities = parsed.opportunities.slice(0,3)
      } else if (Array.isArray(parsed)) {
        opportunities = parsed.slice(0,3)
      }
      if (sysLocale === 'uk') {
        // ensure at least one cyrillic char in combined text else fallback translate baseline fields
        const combined = JSON.stringify(opportunities)
        const hasCyr = /[А-Яа-яІіЇїЄєҐґ]/.test(combined)
        if (!hasCyr) {
          opportunities = opportunities.map(o => ({
            ...o,
            // Primitive quick replacements (не полноценный перевод, но укороченный адаптированный)
            title: o.title,
            description: o.description
              .replace(/automate/i, 'Автоматизація')
              .replace(/automation/i, 'автоматизація')
          }))
        }
      }
    } catch (e) {
      fallback = true
      opportunities = FALLBACK
    }

    // Enrich with monthlySavings
    opportunities = opportunities.map(o => {
      const safeHours = typeof o.estHoursSaved === "number" && o.estHoursSaved >= 0 ? o.estHoursSaved : 0
      const share = typeof o.automationShare === "number" ? Math.min(1, Math.max(0, o.automationShare)) : 0.5
      const ms = Math.round(safeHours * hourlyRate * share)
      return { ...o, automationShare: share, estHoursSaved: safeHours, monthlySavings: ms, complexity: clampInt(o.complexity, 1, 5), confidence: clampFloat(o.confidence, 0, 1) }
    })

    const resp: GenerateOpportunitiesResponse = { opportunities, model, fallback }
    return json(resp)
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}

function json(data: any) {
  return new Response(JSON.stringify(data), { status: 200, headers: { "Content-Type": "application/json" } })
}

function clampInt(v: any, min: number, max: number) {
  const n = Number(v)
  if (!Number.isFinite(n)) return min
  return Math.max(min, Math.min(max, Math.round(n)))
}
function clampFloat(v: any, min: number, max: number) {
  const n = Number(v)
  if (!Number.isFinite(n)) return min
  return Math.max(min, Math.min(max, n))
}
