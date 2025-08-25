"use client"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage = "en" }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language") as Language | null
    if (savedLanguage === "en" || savedLanguage === "uk") {
      setLanguage(savedLanguage)
      return
    }

    // Detect browser language and map ru -> uk, others -> en
    try {
      const browserLang = (navigator?.language || (navigator?.languages && navigator.languages[0]) || "").toLowerCase()
      const normalized: Language = browserLang.startsWith("uk") || browserLang.startsWith("ru") ? "uk" : "en"
      setLanguage(normalized)
    } catch {
      // Fallback stays as defaultLanguage
    }
  }, [])

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("preferred-language", language)
  }, [language])

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        // Fallback to English if key not found
        let fallbackValue: any = translations.en
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === "object" && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey]
          } else {
            return key // Return key if not found in fallback either
          }
        }
        return fallbackValue
      }
    }

    return typeof value === "string" ? value : key
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Custom hook for easier translation access
export function useTranslation() {
  const { t } = useLanguage()
  return { t }
}
