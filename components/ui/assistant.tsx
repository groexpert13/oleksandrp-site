"use client"
import * as React from "react"
import { Bot, Send, Command, Mic, Paperclip, Square } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslation } from "@/lib/i18n/language-context"

type Message = { id: string; role: "user" | "assistant"; content: string }

export function Assistant() {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([
    { id: "m1", role: "assistant", content: "Hi! I can help with AI, automation and projects. How can I assist?" },
  ])
  const [files, setFiles] = React.useState<File[]>([])
  const [persona, setPersona] = React.useState<string>("advisor")
  const [isRecording, setIsRecording] = React.useState(false)
  const recognitionRef = React.useRef<any>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const messagesRef = React.useRef<HTMLDivElement | null>(null)
  const footerRef = React.useRef<HTMLDivElement | null>(null)
  const [footerHeight, setFooterHeight] = React.useState(0)

  // Ensure message list has enough bottom padding not to be hidden by sticky footer
  React.useEffect(() => {
    if (!footerRef.current) return
    const update = () => setFooterHeight(footerRef.current ? footerRef.current.offsetHeight : 0)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(footerRef.current)
    return () => ro.disconnect()
  }, [])

  // Auto-scroll to bottom when new assistant/user message arrives if near bottom
  React.useEffect(() => {
    const el = messagesRef.current
    if (!el) return
    const nearBottom = el.scrollHeight - (el.scrollTop + el.clientHeight) < 120
    if (nearBottom) {
      el.scrollTop = el.scrollHeight
    }
  }, [messages, open])

  // Allow external open from mobile bottom bar
  React.useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener("assistant-open", handler as any)
    return () => window.removeEventListener("assistant-open", handler as any)
  }, [])

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const send = async () => {
    const text = input.trim()
    if (!text && files.length === 0) return
    setInput("")
    setFiles([])
    if (textareaRef.current) {
      textareaRef.current.style.height = "" // reset to default
    }
    const id = Math.random().toString(36).slice(2)
    const userSummary = files.length > 0 ? `${text}\n\n[${files.length} file(s) attached]` : text
    setMessages((m) => [...m, { id, role: "user", content: userSummary }])
    try {
      let res: Response
      if (files.length > 0) {
        const form = new FormData()
        form.append("message", text)
        form.append("persona", persona)
        files.forEach((f, i) => form.append("file" + i, f))
        res = await fetch("/api/assistant", { method: "POST", body: form })
      } else {
        res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, persona }),
        })
      }
      const data = await res.json()
      setMessages((m) => [...m, { id: id + "a", role: "assistant", content: data.reply || "" }])
    } catch {
      setMessages((m) => [...m, { id: id + "e", role: "assistant", content: "Sorry, something went wrong." }])
    }
  }

  const toggleVoice = () => {
    // Try Web Speech API first
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      if (isRecording) {
        try { recognitionRef.current?.stop() } catch {}
        setIsRecording(false)
        return
      }
      const rec = new SpeechRecognition()
      recognitionRef.current = rec
      rec.lang = navigator.language || "en-US"
      rec.continuous = false
      rec.interimResults = false
      rec.onresult = (e: any) => {
        const transcript = Array.from(e.results).map((r: any) => r[0].transcript).join(" ")
        setInput((prev) => (prev ? prev + " " : "") + transcript)
      }
      rec.onerror = () => setIsRecording(false)
      rec.onend = () => setIsRecording(false)
      setIsRecording(true)
      rec.start()
      return
    }
    alert("Voice input not supported in this browser. Please use Chrome or Safari.")
  }

  // Side tab trigger that avoids scroll-to-top
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="hidden sm:flex fixed right-0 top-1/2 -translate-y-1/2 z-50 glass-card rounded-l-xl py-3 pl-3 pr-4 items-center gap-2 hover:pr-5 transition-all"
          aria-label="Open AI Assistant"
        >
          <Bot className="h-5 w-5 text-accent" />
          <span className="font-medium hidden sm:inline">{t("assistant.tab")}</span>
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0">
        <SheetHeader className="p-4 pr-12 border-b border-border/30">
          <SheetTitle className="sr-only">{t("common.assistant")}</SheetTitle>
          <div className="grid grid-cols-[1fr_auto] items-end gap-3">
            <div className="flex flex-col gap-1 w-full">
              <span className="text-xs text-muted-foreground">{t("assistant.personaLabel")}</span>
              <Select value={persona} onValueChange={setPersona}>
                <SelectTrigger className="glass w-full">
                  <SelectValue placeholder="Choose assistant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="advisor">{t("assistant.personas.advisor")}</SelectItem>
                  <SelectItem value="lead">{t("assistant.personas.lead")}</SelectItem>
                  <SelectItem value="product">{t("assistant.personas.product")}</SelectItem>
                  <SelectItem value="analyst">{t("assistant.personas.analyst")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-muted-foreground text-xs hidden sm:flex items-center gap-2 whitespace-nowrap self-end pb-[2px]">
              <Command className="h-3.5 w-3.5" /> Cmd/Ctrl + K
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div ref={messagesRef} className="flex-1 overflow-y-auto p-4 space-y-3" style={{ paddingBottom: footerHeight + 12 }}>
            {messages.map((m) => (
              <GlassCard key={m.id} className={m.role === "user" ? "ml-auto max-w-[85%]" : "mr-auto max-w-[85%]"}>
                <div className="text-sm whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </div>
              </GlassCard>
            ))}
          </div>
          <div ref={footerRef} className="border-t border-border/30 p-3 bg-background/80 backdrop-blur-md safe-bottom sticky bottom-0">
            {isRecording && (
              <div className="flex justify-center mb-2">
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span className="relative inline-flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-destructive/80 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive"></span>
                  </span>
                  {t("assistant.listening")}
                </div>
              </div>
            )}
            {files.length > 0 && (
              <div className="text-xs text-muted-foreground mb-1">{files.length} file(s) ready</div>
            )}
            <div className="relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onInput={(e) => {
                  const el = e.currentTarget
                  const max = 24 * 3 // approx 3 lines in px (tailwind max-h-24)
                  el.style.height = "auto"
                  const next = Math.min(el.scrollHeight, max)
                  el.style.height = next + "px"
                  el.style.overflowY = el.scrollHeight > max ? "auto" : "hidden"
                }}
                placeholder={t("assistant.placeholder")}
                className="pr-24 pl-10 resize-none min-h-10 max-h-24 overflow-hidden"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    send()
                  }
                }}
              />
              {/* Left mic inside input */}
              <button
                onClick={toggleVoice}
                className={
                  "absolute left-1.5 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass flex items-center justify-center hover:shadow " +
                  (isRecording ? "ring-2 ring-destructive/40" : "")
                }
                aria-label="Voice"
              >
                {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              {/* Attach */}
              <label
                className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass flex items-center justify-center hover:shadow cursor-pointer"
                aria-label="Attach"
              >
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => setFiles(Array.from(e.target.files || []))}
                />
                <Paperclip className="h-4 w-4" />
              </label>
              {/* Send */}
              <button
                onClick={send}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full glass flex items-center justify-center hover:shadow"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}


