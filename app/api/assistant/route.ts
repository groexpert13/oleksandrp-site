import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    let message = ""
    let persona = "advisor"
    if (req.headers.get("content-type")?.includes("multipart/form-data")) {
      const form = await req.formData()
      message = String(form.get("message") || "")
      persona = String(form.get("persona") || "advisor")
      // Files are available via form.getAll("file{i}") if needed
    } else {
      const body = await req.json()
      message = body?.message || ""
      persona = body?.persona || "advisor"
    }
    // Placeholder echo logic; integrate real OpenAI or other LLM here.
    const reply = message
      ? `(${persona}) Got it. Here's how I can help with "${message}": I can propose AI/automation options, estimate scope, and outline next steps.`
      : `(${persona}) Hello! Ask me about AI, automation, or your project.`

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


