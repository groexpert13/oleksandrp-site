import { NextRequest } from "next/server"
import { agents, type PersonaId } from "@/lib/agents"

export async function POST(req: NextRequest) {
  try {
    let message = ""
    let persona: PersonaId = "advisor"
    let history: { role: "user" | "assistant"; content: string }[] = []
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await req.formData()
      message = String(form.get("message") || "")
      persona = (String(form.get("persona") || "advisor") as PersonaId)
      // Files are available via form.getAll("file{i}") if needed
    } else {
      const body = await req.json()
      message = body?.message || ""
      persona = (body?.persona || "advisor") as PersonaId
      history = Array.isArray(body?.history) ? body.history.slice(-20) : []
    }
    const apiKey = process.env.OPENAI_API_KEY || (process.env as any).OPENAI_API
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing OPENAI_API_KEY" }), { status: 500 })
    }
    const agent = agents[persona] || agents.advisor

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: agent.model,
        input: [
          { role: "system", content: agent.system },
          ...history,
          { role: "user", content: message },
        ],
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      return new Response(JSON.stringify({ error: text }), { status: 500 })
    }
    const data = await res.json()
    const reply = data?.output_text || data?.content?.[0]?.text || ""
    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (e) {
    return new Response(JSON.stringify({ reply: "Sorry, something went wrong." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}


