"use client"
import { Phone, Mail, MessageSquareText, Bot } from "lucide-react"
import { siteLinks } from "@/lib/utils"
// We can't use SheetTrigger outside of the Assistant Sheet. We'll dispatch a global event.

export function MobileContactBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      <div className="mx-auto max-w-3xl px-4 pb-[env(safe-area-inset-bottom)]">
        <div className="glass-card mb-2 rounded-t-xl shadow-2xl">
          <div className="grid grid-cols-3 divide-x divide-border/30">
            <a
              href={`tel:${siteLinks.phone}`}
              className="flex items-center justify-center py-3 text-sm font-medium text-foreground hover:text-accent transition-colors"
              aria-label="Call"
            >
              <Phone className="h-5 w-5" />
            </a>
            <button
              onClick={() => window.dispatchEvent(new Event("assistant-open"))}
              className="flex items-center justify-center py-3 text-sm font-medium text-foreground hover:text-accent transition-colors w-full"
              aria-label="Ask AI"
            >
              <Bot className="h-5 w-5" />
            </button>
            <a
              href={`mailto:${siteLinks.email}`}
              className="flex items-center justify-center py-3 text-sm font-medium text-foreground hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}


