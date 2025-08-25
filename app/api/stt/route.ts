import { NextRequest } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File | null
    const language = (formData.get("language") as string) || undefined
    const target = (formData.get("target") as string) || undefined // e.g., 'uk' for auto-uk translation
    if (!audioFile) {
      return new Response(JSON.stringify({ error: "No audio provided" }), { status: 400 })
    }

    const apiKey = process.env.OPENAI_API_KEY || (process.env as any).OPENAI_API
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), { status: 500 })
    }

    // Forward to OpenAI Whisper
    const openaiForm = new FormData()
    openaiForm.append("file", audioFile, (audioFile as any).name || "chunk.webm")
    openaiForm.append("model", "whisper-1")
    if (language) openaiForm.append("language", language)
    openaiForm.append("response_format", "verbose_json")

    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: openaiForm as any,
    })

    if (!res.ok) {
      const txt = await res.text()
      return new Response(JSON.stringify({ error: "OpenAI error", detail: txt }), { status: 500 })
    }
    const data = await res.json()
    let text: string = data.text || ""
    const detectedLang: string | undefined = data.language

    // Auto-translate to Ukrainian if requested and detected language is not Ukrainian
    if (target === "uk" && text && detectedLang && detectedLang !== "uk") {
      try {
        const r = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_RESPONSES_MODEL || "gpt-4o-mini",
            input: `Translate to Ukrainian while preserving meaning, tone, and punctuation. Do not add commentary.\n\nText:\n${text}`,
          }),
        })
        if (r.ok) {
          const tr = await r.json()
          const out = tr.output?.[0]?.content?.[0]?.text
          if (typeof out === "string" && out.trim()) text = out.trim()
        }
      } catch {}
    }
    return new Response(JSON.stringify({ text, language: detectedLang }), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 })
  }
}


