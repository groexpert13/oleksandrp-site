"use client"
import * as React from "react"
import { Bot, Send, Command, Mic, Paperclip, Square, ChevronUp, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { Markdown } from "@/components/ui/markdown"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { agents } from "@/lib/agents"
import { useTranslation } from "@/lib/i18n/language-context"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

type Message = { id: string; role: "user" | "assistant" | "system"; content: string }

export function Assistant() {
  const { t } = useTranslation()
  const [open, setOpen] = React.useState(false)
  const [input, setInput] = React.useState("")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [persona, setPersona] = React.useState<string>("advisor")
  // Persist persona and messages
  React.useEffect(() => {
    try {
      const p = localStorage.getItem("assistant-persona")
      if (p) setPersona(p)
      const raw = localStorage.getItem("assistant-history")
      if (raw) {
        const arr = JSON.parse(raw)
        if (Array.isArray(arr)) setMessages(arr)
      }
    } catch {}
  }, [])
  const isInitialLoadRef = React.useRef(true)

  React.useEffect(() => {
    try { localStorage.setItem("assistant-persona", persona) } catch {}
    // info message on persona switch
    setMessages((m) => [
      ...m,
      { id: `sys-${Date.now()}`, role: "system", content: `Switched to: ${agents[persona as keyof typeof agents].name}. ${agents[persona as keyof typeof agents].hint}` },
    ])
    // Highlight agent change with green glow (but not on initial load)
    if (!isInitialLoadRef.current) {
      setUiState(prev => ({ ...prev, recentlyChangedAgent: true }))
      const timer = setTimeout(() => {
        setUiState(prev => ({ ...prev, recentlyChangedAgent: false }))
      }, 3000) // 3 seconds highlight
      return () => clearTimeout(timer)
    } else {
      isInitialLoadRef.current = false
      setUiState(prev => ({ ...prev, isInitialLoad: false }))
    }
  }, [persona])
  React.useEffect(() => {
    try { localStorage.setItem("assistant-history", JSON.stringify(messages.slice(-100))) } catch {}
  }, [messages])

  const [files, setFiles] = React.useState<File[]>([])
  const [isRecording, setIsRecording] = React.useState(false)
  const recognitionRef = React.useRef<any>(null)
  const baseInputRef = React.useRef<string>("")
  const [interim, setInterim] = React.useState("")
  // STT language preference
  const [sttLang, setSttLang] = React.useState<"auto" | "uk" | "ru" | "en">("auto")
  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("assistant-stt-lang") as any
      if (saved === "uk" || saved === "ru" || saved === "en" || saved === "auto") setSttLang(saved)
    } catch {}
  }, [])
  React.useEffect(() => {
    try { localStorage.setItem("assistant-stt-lang", sttLang) } catch {}
  }, [sttLang])

  const sttLangToLocale = React.useCallback((l: "auto"|"uk"|"ru"|"en") => {
    if (l === "uk") return "uk-UA"
    if (l === "ru") return "ru-RU"
    if (l === "en") return "en-US"
    return navigator.language || "en-US"
  }, [])
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)
  const chunksRef = React.useRef<Blob[]>([])
  const streamTimerRef = React.useRef<number | null>(null)
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
  const messagesRef = React.useRef<HTMLDivElement | null>(null)
  const footerRef = React.useRef<HTMLDivElement | null>(null)
  const lastSeenCountRef = React.useRef<number>(1)

  // Group UI state together
  const [uiState, setUiState] = React.useState({
    footerHeight: 0,
    showJump: false,
    unreadCount: 0,
    nearBottom: true,
    bannerCollapsed: false,
    recentlyChangedAgent: false,
    isInitialLoad: true,
    isStreaming: false,
  })

  React.useEffect(() => {
    try {
      const b = localStorage.getItem("assistant-banner-collapsed")
      if (b === "1") {
        setUiState(prev => ({ ...prev, bannerCollapsed: true }))
      }
    } catch {}
  }, [])
  
  React.useEffect(() => {
    try { 
      localStorage.setItem("assistant-banner-collapsed", uiState.bannerCollapsed ? "1" : "0") 
    } catch {}
  }, [uiState.bannerCollapsed])

  // Ensure message list has enough bottom padding not to be hidden by sticky footer
  React.useEffect(() => {
    if (!footerRef.current) return
    const update = () => setUiState(prev => ({ 
      ...prev, 
      footerHeight: footerRef.current ? footerRef.current.offsetHeight : 0 
    }))
    update()
    const ro = new ResizeObserver(update)
    ro.observe(footerRef.current)
    return () => ro.disconnect()
  }, [])

  // Auto-scroll to bottom when new assistant/user message arrives if near bottom
  const scrollToBottomCallback = React.useCallback(() => {
    const el = messagesRef.current
    if (!el) return
    const nb = el.scrollHeight - (el.scrollTop + el.clientHeight) < 120
    
    setUiState(prev => ({ 
      ...prev, 
      nearBottom: nb, 
      showJump: !nb,
      ...(nb && { unreadCount: 0 })
    }))
    
    if (nb) {
      setTimeout(() => {
        el.scrollTop = el.scrollHeight + 2000
        lastSeenCountRef.current = messages.length
      }, 0)
    }
  }, [messages])

  React.useEffect(scrollToBottomCallback, [messages, open, scrollToBottomCallback])

  // Track scroll to toggle Jump button
  const onMessagesScroll = React.useCallback(() => {
    const el = messagesRef.current
    if (!el) return
    const nb = el.scrollHeight - (el.scrollTop + el.clientHeight) < 120
    
    setUiState(prev => ({ 
      ...prev, 
      nearBottom: nb, 
      showJump: !nb,
      ...(nb && { unreadCount: 0 })
    }))
    
    if (nb) {
      lastSeenCountRef.current = messages.length
    }
  }, [])

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
          body: JSON.stringify({ message: text, persona, history: messages.filter((mm)=>mm.role!=="system").map(({ role, content }) => ({ role, content })) }),
        })
      }
      // If streaming – parse SSE-like stream
      const contentType = res.headers.get("content-type") || ""
      if (contentType.includes("text/event-stream")) {
        const reader = res.body?.getReader()
        if (!reader) return
        const decoder = new TextDecoder()
        let sseBuffer = ""
        let rendered = ""
        let pending = ""
        setMessages((m) => [...m, { id: id + "a", role: "assistant", content: "" }])
        setUiState(prev => ({ ...prev, isStreaming: true }))
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          sseBuffer += decoder.decode(value, { stream: true })
          const events = sseBuffer.split("\n\n")
          sseBuffer = events.pop() || ""
          for (const evt of events) {
            const dataLine = evt.split("\n").find((l) => l.startsWith("data: "))
            if (!dataLine) continue
            try {
              const payload = JSON.parse(dataLine.slice(6))
              if (payload?.type === "response.output_text.delta") {
                const deltaText: string = payload.delta || ""
                pending += deltaText
                const flushable = /[\s\.,!?:;\)]$/.test(pending) || pending.length > 24
                const hasNewline = /\n/.test(deltaText)
                if (flushable) {
                  rendered += pending
                  pending = ""
                  setMessages((m) => {
                    const last = m[m.length - 1]
                    if (last && last.id === id + "a") {
                      return [...m.slice(0, -1), { ...last, content: rendered }]
                    }
                    return m
                  })
                  if (!uiState.nearBottom) {
                    setUiState(prev => ({ ...prev, unreadCount: Math.max(0, (messages.length + 1) - lastSeenCountRef.current) }))
                  }
                  if (hasNewline) {
                    const el = messagesRef.current
                    if (el && uiState.nearBottom) {
                      setTimeout(() => {
                        el.scrollTop = el.scrollHeight + 2000
                      }, 0)
                    }
                  }
                }
              } else if (payload?.type === "response.output_text.done") {
                if (pending) {
                  rendered += pending
                  pending = ""
                  setMessages((m) => {
                    const last = m[m.length - 1]
                    if (last && last.id === id + "a") {
                      return [...m.slice(0, -1), { ...last, content: rendered }]
                    }
                    return m
                  })
                }
              }
            } catch {}
          }
        }
        setUiState(prev => ({ ...prev, isStreaming: false }))
      } else {
        const data = await res.json()
        setMessages((m) => [...m, { id: id + "a", role: "assistant", content: data.reply || "" }])
      }
    } catch {
      setMessages((m) => [...m, { id: id + "e", role: "assistant", content: "Sorry, something went wrong." }])
    }
  }

  const toggleVoice = async () => {
    // Try Web Speech API first
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (SpeechRecognition) {
      if (isRecording) {
        try { recognitionRef.current?.stop() } catch {}
        setIsRecording(false)
        setInterim("")
        baseInputRef.current = ""
        return
      }
      const rec = new SpeechRecognition()
      recognitionRef.current = rec
      // Force recognition language based on user preference (e.g., speak RU but transcribe in UK)
      rec.lang = sttLangToLocale(sttLang)
      rec.continuous = true
      rec.interimResults = true
      baseInputRef.current = input
      rec.onresult = (e: any) => {
        let finalText = ""
        let interimText = ""
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i]
          if (res.isFinal) {
            finalText += res[0].transcript
          } else {
            interimText += res[0].transcript
          }
        }
        if (finalText) {
          baseInputRef.current = (baseInputRef.current ? baseInputRef.current + " " : "") + finalText.trim()
          setInterim("")
          setInput(baseInputRef.current)
          // keep caret at end
          requestAnimationFrame(() => textareaRef.current && (textareaRef.current.selectionStart = textareaRef.current.selectionEnd = textareaRef.current.value.length))
        } else if (interimText) {
          setInterim(interimText)
          setInput((baseInputRef.current + " " + interimText).trim())
        }
      }
      rec.onerror = () => {
        setIsRecording(false)
        setInterim("")
      }
      rec.onend = () => {
        if (isRecording) {
          try { rec.start() } catch {}
        } else {
          setInterim("")
        }
      }
      setIsRecording(true)
      rec.start()
      return
    }
    // Fallback: record short chunks and send to Whisper
    try {
      if (isRecording) {
        if (streamTimerRef.current) {
          window.clearInterval(streamTimerRef.current)
          streamTimerRef.current = null
        }
        // Flush remaining audio once on stop
        const flush = async () => {
          if (chunksRef.current.length === 0) return
          const blob = new Blob(chunksRef.current, { type: "audio/webm" })
          chunksRef.current = []
          const form = new FormData()
          form.append("audio", blob, "speech-part.webm")
          form.append("language", navigator.language || "en")
          const res = await fetch("/api/stt", { method: "POST", body: form })
          const data = await res.json()
          if (data?.text) {
            baseInputRef.current = (baseInputRef.current ? baseInputRef.current + " " : "") + data.text
            setInput(baseInputRef.current)
          }
        }
        await flush()
        mediaRecorderRef.current?.stop()
        setIsRecording(false)
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" })
      mediaRecorderRef.current = mr
      chunksRef.current = []
      baseInputRef.current = input
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data)
      }
      mr.onstop = () => {
        if (streamTimerRef.current) {
          window.clearInterval(streamTimerRef.current)
          streamTimerRef.current = null
        }
        setIsRecording(false)
      }
      // Start fetching chunks frequently for near-real-time updates
      mr.start(500)
      streamTimerRef.current = window.setInterval(async () => {
        if (chunksRef.current.length === 0) return
        const blob = new Blob(chunksRef.current, { type: "audio/webm" })
        chunksRef.current = []
        const form = new FormData()
        form.append("audio", blob, "speech-part.webm")
        // Use auto-detect, but if user wants Ukrainian output while speaking Russian,
        // request server-side translation by specifying target="uk".
        if (sttLang !== "auto") form.append("language", sttLang)
        if (sttLang === "uk") form.append("target", "uk")
        try {
          const res = await fetch("/api/stt", { method: "POST", body: form })
          const data = await res.json()
          if (data?.text) {
            baseInputRef.current = (baseInputRef.current ? baseInputRef.current + " " : "") + data.text
            setInput(baseInputRef.current)
          }
        } catch {}
      }, 1500)
      setIsRecording(true)
    } catch (err) {
      alert("Microphone is not available. Please allow access and try again.")
    }
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
        <SheetHeader className="p-3 sm:p-4 pr-12 border-b border-border/30">
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
            <div className="flex items-end justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setMessages([])}>Clear chat</Button>
            </div>
          </div>
        </SheetHeader>
        <div className="flex flex-col h-full">
          <div ref={messagesRef} onScroll={onMessagesScroll} className="relative flex-1 overflow-y-auto px-4 pb-4 space-y-3" style={{ paddingBottom: uiState.footerHeight + 80 }}>
            {/* Persona banner - sticky, collapsible, at the very top */}
            <div className="sticky top-0 z-10 pt-2 pb-2 bg-gradient-to-b from-background via-background/95 to-transparent">
              <div className={`glass-card px-3 py-2 rounded-md text-xs text-muted-foreground flex items-center justify-between transition-all duration-500 ${
                uiState.recentlyChangedAgent 
                  ? 'border-green-500/60 shadow-[0_0_10px_rgba(34,197,94,0.3)] ring-1 ring-green-500/30' 
                  : 'border-border/20'
              }`}>
                <div className={`transition-all ${uiState.bannerCollapsed ? "line-clamp-1" : ""}`}>
                  <span className="font-medium text-foreground/80">{agents[persona as keyof typeof agents]?.name}:</span>
                  <span className="ml-1">{agents[persona as keyof typeof agents]?.hint}</span>
                </div>
                <button aria-label="Toggle banner" className="ml-3 glass rounded-md px-2 py-1 text-foreground hover:shadow" onClick={() => setUiState(prev => ({ ...prev, bannerCollapsed: !prev.bannerCollapsed }))}>
                  {uiState.bannerCollapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>
            {messages.map((m, i) => (
              <GlassCard key={m.id} className={m.role === "user" ? "ml-auto max-w-[85%]" : m.role === "system" ? "mx-auto max-w-[90%] border-dashed" : "mr-auto max-w-[85%]"}>
                <div className="text-sm leading-relaxed">
                  {m.role === "system" ? (
                    <div className="text-xs text-muted-foreground">
                      <Markdown content={m.content} />
                    </div>
                  ) : (
                    <Markdown content={m.content} />
                  )}
                  {i === messages.length - 1 && uiState.isStreaming && m.role === "assistant" && (
                    <span className="inline-flex items-center pl-1 align-middle">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce [animation-delay:-0.2s]"></span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/60 mx-0.5 animate-bounce [animation-delay:-0.1s]"></span>
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-foreground/60 animate-bounce"></span>
                    </span>
                  )}
                  {/* Contextual CTA buttons when agent suggests actions */}
                  {agents[persona as keyof typeof agents]?.ui?.showCTAButtons && m.role === "assistant" && (
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-sm">
                      <Button 
                        size="sm" 
                        variant="default" 
                        onClick={() => {
                          const contactSection = document.getElementById('contact')
                          if (contactSection) {
                            setOpen(false) // Close assistant first
                            setTimeout(() => {
                              contactSection.scrollIntoView({ behavior: 'smooth' })
                            }, 200)
                          }
                        }}
                        className="w-full text-xs px-2 py-1 h-8 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={t("assistant.buttons.contactDeveloper")}
                      >
                        <span className="truncate">{t("assistant.buttons.contactDeveloper")}</span>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => toggleVoice()}
                        className="w-full text-xs px-2 py-1 h-8 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={isRecording ? t("assistant.buttons.stopRecording") : t("assistant.buttons.recordVoice")}
                      >
                        <span className="truncate">
                          {isRecording ? t("assistant.buttons.stopRecording") : t("assistant.buttons.recordVoice")}
                        </span>
                      </Button>
                    </div>
                  )}
                </div>
              </GlassCard>
            ))}
            <div className={`pointer-events-none sticky w-full flex justify-center transition-opacity ${uiState.showJump ? "opacity-100" : "opacity-0"}`} style={{ bottom: uiState.footerHeight + 20 }}>
              <div className="pointer-events-auto">
                <Button size="sm" className="glass" onClick={() => { const el = messagesRef.current; if (el) { el.scrollTop = el.scrollHeight + 2000; setUiState(prev => ({ ...prev, unreadCount: 0 })); lastSeenCountRef.current = messages.length; } }}>
                  {uiState.unreadCount > 0 ? `Jump to latest · ${uiState.unreadCount}` : "Jump to latest"}
                </Button>
              </div>
            </div>
          </div>
          <div ref={footerRef} className="border-t border-border/30 p-3 bg-background/80 backdrop-blur-md safe-bottom sticky bottom-0">
            {isRecording && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-destructive/80 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-destructive"></span>
                </span>
                {t("assistant.listening")}
              </div>
            )}
            {isRecording && (
              <div />
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
              {/* STT language selector (hidden by default, auto-detect). Unhide if user wants manual control. */}
              {/*
              <div className="absolute left-10 top-1/2 -translate-y-1/2">
                <Select value={sttLang} onValueChange={(v)=>setSttLang(v as any)}>
                  <SelectTrigger className="h-8 w-24 text-xs glass">
                    <SelectValue placeholder="Lang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="uk">Українська</SelectItem>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              */}
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


