import { NextRequest } from 'next/server'
import { NextQuestionRequest, NextQuestionResponse } from '@/lib/quest/schema'
import { questPrompts } from '@/lib/quest/prompts'

export const runtime = 'nodejs'

const FALLBACK: NextQuestionResponse = {
  question: {
    id: 'avgTaskDuration',
    label: 'Average duration (minutes) of one repetitive task?',
    type: 'number',
    placeholder: '5',
    rationale: 'Helps refine savings magnitude'
  },
  fallback: true
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NextQuestionRequest
    const answers = Array.isArray(body.answers) ? body.answers.slice(-25) : []
    const locale = (body.locale || 'en').toLowerCase()
    const apiKey = process.env.OPENAI_API_KEY || (process as any).env.OPENAI_API
    const model = process.env.OPENAI_RESPONSES_MODEL || 'gpt-4o-mini'

    if (!apiKey) return json(FALLBACK)

  const sysLocale = locale.startsWith('uk') ? 'uk' : locale.startsWith('ru') ? 'uk' : 'en'
  const system = questPrompts.nextQuestionSystem({ locale: sysLocale })
  const user = questPrompts.nextQuestionUser(answers.map(a=>({id:a.id,value:a.value})))
    try {
      const r = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, input: [ { role: 'system', content: system }, { role: 'user', content: user } ], stream: false })
      })
      if (!r.ok) throw new Error(await r.text())
      const jr = await r.json()
      const raw = jr?.output?.[0]?.content?.[0]?.text || ''
      const parsed = JSON.parse(raw)
      if (parsed?.question?.id && parsed?.question?.label) {
        return json({ question: parsed.question })
      }
    } catch (e) {
      return json(FALLBACK)
    }
    return json(FALLBACK)
  } catch (e:any) {
    return new Response(JSON.stringify({ error: e?.message || 'Server error'}), { status:500, headers:{'Content-Type':'application/json'} })
  }
}

function json(data: any) {
  return new Response(JSON.stringify(data), { status:200, headers:{'Content-Type':'application/json'} })
}
