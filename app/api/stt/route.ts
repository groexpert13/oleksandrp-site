import { NextRequest } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const audioFile = formData.get("audio") as File | null
    const language = (formData.get("language") as string) || undefined
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
    const text: string = data.text || ""
    return new Response(JSON.stringify({ text }), { status: 200, headers: { "Content-Type": "application/json" } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.message || "Server error" }), { status: 500 })
  }
}


