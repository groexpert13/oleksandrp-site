import { NextRequest } from "next/server"

export const runtime = "nodejs"

type SimulateRequest = {
  hoursPerMonth: number
  hourlyRate: number
  automationShare: number // 0..1
  implementationCost: number
  months?: number
  locale?: "en" | "uk" | "ru"
  narrative?: boolean
}

type SimulationResult = {
  monthlySavings: number
  paybackMonths: number
  series: { month: number; cumulative: number }[]
  narrative?: string
}

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min
  return Math.max(min, Math.min(max, value))
}

function toNumberSafe(v: unknown, fallback = 0): number {
  const n = typeof v === "string" ? Number(v) : typeof v === "number" ? v : NaN
  return Number.isFinite(n) ? n : fallback
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<SimulateRequest>
    const hoursPerMonth = clamp(toNumberSafe(body.hoursPerMonth, 0), 0, 1_000_000)
    const hourlyRate = clamp(toNumberSafe(body.hourlyRate, 0), 0, 1_000_000)
    const automationShare = clamp(toNumberSafe(body.automationShare, 0), 0, 1)
    const implementationCost = clamp(toNumberSafe(body.implementationCost, 0), 0, 100_000_000)
    const months = Math.max(1, Math.min(36, Math.floor(toNumberSafe(body.months, 12))))
    const locale = (body.locale as SimulateRequest["locale"]) || "en"
    const withNarrative = Boolean(body.narrative)

    // Core calculations
    const epsilon = 1
    const monthlySavings = hoursPerMonth * automationShare * hourlyRate
    const paybackMonths = Math.max(1, Math.ceil(implementationCost / Math.max(monthlySavings, epsilon)))
    const series: { month: number; cumulative: number }[] = []
    for (let m = 1; m <= months; m++) {
      const cumulative = monthlySavings * m - implementationCost
      series.push({ month: m, cumulative })
    }

    const result: SimulationResult = { monthlySavings, paybackMonths, series }

    // Optional short narrative using Responses API
    if (withNarrative) {
      const apiKey = process.env.OPENAI_API_KEY || (process.env as any).OPENAI_API
      if (apiKey) {
        try {
          const localeHint = locale === "uk" ? "uk" : locale === "ru" ? "ru" : "en"
          const input = [
            { role: "system", content: "You are a professional financial analyst. ALWAYS answer ONLY in the requested locale language (no mixing). Output 2 short practical sentences about ROI (no marketing fluff)." },
            { role: "user", content: `Locale=${localeHint}. MonthlySavings=${monthlySavings.toFixed(2)}. PaybackMonths=${paybackMonths}. Write concise ROI summary.` },
          ]
          const r = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: process.env.OPENAI_RESPONSES_MODEL || "gpt-4o-mini",
              input,
              stream: false,
            }),
          })
          if (r.ok) {
            const jr = await r.json()
            const text = jr?.output?.[0]?.content?.[0]?.text
            if (typeof text === "string" && text.trim()) {
              let narrative = text.trim()
              if (localeHint === 'uk') {
                const hasCyr = /[А-Яа-яІіЇїЄєҐґ]/.test(narrative)
                if (!hasCyr) {
                  // Fallback шаблон украинский
                  narrative = `Щомісячна економія ≈ ${monthlySavings.toFixed(0)}. Окупність за ${paybackMonths} міс. Швидкий шлях до позитивного ROI.`
                }
              }
              result.narrative = narrative
            } else if (localeHint === 'uk') {
              result.narrative = `Щомісячна економія ≈ ${monthlySavings.toFixed(0)}. Окупність за ${paybackMonths} міс. Швидкий шлях до позитивного ROI.`
            }
          }
        } catch {}
      }
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Bad request" }), { status: 400 })
  }
}


