import { NextRequest } from 'next/server'
import { SummaryRequest, SummaryResponse } from '@/lib/quest/schema'
import { questPrompts } from '@/lib/quest/prompts'

export const runtime = 'nodejs'

const FALLBACK_TEXT_EN = 'Summary unavailable (fallback). Ensure key metrics are filled: team size, repetitive hours, and at least one selected opportunity.'
const FALLBACK_TEXT_UK = 'Підсумок недоступний (fallback). Заповніть ключові метрики: розмір команди, години повторюваних задач і виберіть хоча б одну можливість.'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SummaryRequest
    const answers = Array.isArray(body.answers) ? body.answers.slice(0,50) : []
    const opportunities = Array.isArray(body.opportunities) ? body.opportunities.slice(0,20) : []
    const locale = (body.locale || 'en').toLowerCase()
    const implementationCost = typeof body.implementationCost === 'number' ? body.implementationCost : undefined
    const targetPayback = typeof body.targetPayback === 'number' ? body.targetPayback : undefined
    const apiKey = process.env.OPENAI_API_KEY || (process as any).env.OPENAI_API
    const model = process.env.OPENAI_RESPONSES_MODEL || 'gpt-4o-mini'

    const selectedMonthly = opportunities.reduce((s,o)=> s + (o.monthlySavings||0),0)
    const paybackMonths = implementationCost && selectedMonthly>0 ? Math.ceil(implementationCost/selectedMonthly) : undefined

    if (!apiKey) {
      return json(makeFallback(locale))
    }

    const lang = locale.startsWith('uk') ? 'uk' : locale.startsWith('ru') ? 'uk' : 'en'
    const system = questPrompts.summarySystem({ lang })
    const user = questPrompts.summaryUser({
      answers: answers.map(a=>({id:a.id,value:a.value})),
      opportunities: opportunities.map(o=>({id:o.id,ms:o.monthlySavings,complexity:o.complexity})),
      implementationCost,
      paybackMonths,
      targetPayback
    })

    try {
      const r = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { 'Content-Type':'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, input: [ { role:'system', content: system }, { role:'user', content: user } ], stream:false })
      })
      if (!r.ok) throw new Error(await r.text())
      const jr = await r.json()
      const text = jr?.output?.[0]?.content?.[0]?.text || ''
      if (text.trim()) {
        const resp: SummaryResponse = { summary: text.trim(), model }
        return json(resp)
      }
    } catch (e) {
      return json(makeFallback(locale))
    }
    return json(makeFallback(locale))
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error'}), { status:500, headers:{'Content-Type':'application/json'} })
  }
}

function makeFallback(locale: string): SummaryResponse {
  const summary = locale.startsWith('uk') || locale.startsWith('ru') ? FALLBACK_TEXT_UK : FALLBACK_TEXT_EN
  return { summary, fallback: true }
}

function json(data: any) {
  return new Response(JSON.stringify(data), { status:200, headers:{'Content-Type':'application/json'} })
}
