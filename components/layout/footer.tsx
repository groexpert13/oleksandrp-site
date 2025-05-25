"use client";

import { Mail, ExternalLink, Code2, Briefcase, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Language } from "@/lib/i18n/translations";

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="border-t">
      <div className="container mx-auto py-6 md:py-8">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex flex-col space-y-6">
            {/* Project and Details */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('project')}</span>
                </div>
                <div>
                  <a
                    href="https://www.jamai.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-sm font-medium text-muted-foreground transition-shadow hover:shadow-lg hover:bg-secondary/80"
                  >
                    JamAI Assistant
                  </a>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{t('techStack')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs text-muted-foreground">
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 font-medium">full-stack</span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 font-medium">AI/ML</span>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 font-medium">growth-marketing</span>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="h-px bg-border" />
            
            {/* Contact and Copyright */}
            <div className="flex flex-col items-center sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:justify-start sm:gap-3">
                <span className="text-xs font-medium text-muted-foreground">Oleksandr P.</span>
                <a 
                  href="mailto:hi@oleksandrp.me" 
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                  <span>hi@oleksandrp.me</span>
                </a>
                <a 
                  href="https://t.me/sapl13" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Telegram"
                >
                  <Send className="h-4 w-4" />
                  <span>Telegram</span>
                </a>
                <a
                  href="https://t.me/+3RmWoAvtdbRiYjMy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  aria-label="Telegram Channel"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>Telegram Channel</span>
                </a>
              </div>
              
              {/* Language Switcher */}
              <div className="flex flex-wrap justify-center items-center gap-1.5">
                {[
                  { code: "en", label: "English" },
                  { code: "uk", label: "Українська" },
                  { code: "ru", label: "Русский" },
                  { code: "es", label: "Español" },
                ].map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code as Language)}
                    className={cn(
                      "text-xs transition-colors px-1.5 py-1",
                      language === code
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground/80"
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}