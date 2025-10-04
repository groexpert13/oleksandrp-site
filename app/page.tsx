"use client"

import { Youtube, Send, MessageCircle, Sun, Moon, Monitor, ChevronDown, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { translations, detectLanguage, type Language } from "@/lib/i18n"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<Language>('ru')
  const [showLangMenu, setShowLangMenu] = useState(false)
  const [loading, setLoading] = useState(true)

  const langMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    setLang(detectLanguage())
    // Hide loader after mount
    setTimeout(() => setLoading(false), 800)
  }, [])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false)
      }
    }

    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showLangMenu])

  const t = translations[lang]
  const [openService, setOpenService] = useState<number | null>(null)

  const youtubeVideos = [
    { title: t.videos[0], url: "https://www.youtube.com/@oleksandrpme" },
    { title: t.videos[1], url: "https://www.youtube.com/@oleksandrpme" },
    { title: t.videos[2], url: "https://www.youtube.com/@oleksandrpme" },
    { title: t.videos[3], url: "https://www.youtube.com/@oleksandrpme" },
  ]

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white dark:bg-black flex items-center justify-center z-50">
        <div className="relative">
          <img 
            src="/oleksandrp_logo.webp" 
            alt="Loading..." 
            className="w-20 h-20 animate-spin"
            style={{ animationDuration: '2s' }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-black/95 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 h-12 sm:h-14 flex items-center justify-between">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <img 
              src="/oleksandrp_logo.webp" 
              alt="Logo" 
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
            <div className="text-xs sm:text-sm font-medium">{t.name}</div>
          </div>
          
          {/* Right: Theme + Language */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Group */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-900 rounded-lg p-0.5 sm:p-1">
              <button
                onClick={() => setTheme('system')}
                className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                  theme === 'system' 
                    ? 'bg-white dark:bg-gray-800 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                title="System"
              >
                {mounted && <Monitor className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                  theme === 'light' 
                    ? 'bg-white dark:bg-gray-800 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                title="Light"
              >
                {mounted && <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1 sm:p-1.5 rounded-md transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white dark:bg-gray-800 shadow-sm' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                }`}
                title="Dark"
              >
                {mounted && <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
            </div>
            
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-gray-100 dark:bg-gray-900 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline text-sm font-medium">{lang === 'ru' ? 'Русский' : 'Українська'}</span>
                <span className="sm:hidden text-xs font-medium">{lang === 'ru' ? 'РУ' : 'УК'}</span>
                <ChevronDown className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 sm:w-36 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                  <button
                    onClick={() => { setLang('ru'); setShowLangMenu(false) }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      lang === 'ru' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : ''
                    }`}
                  >
                    Русский
                  </button>
                  <button
                    onClick={() => { setLang('uk'); setShowLangMenu(false) }}
                    className={`w-full px-3 py-2 text-left text-xs sm:text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                      lang === 'uk' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : ''
                    }`}
                  >
                    Українська
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-12 sm:pt-14">
        {/* Page 1: About */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl w-full">
            {/* Hero */}
            <div className="text-center mb-16">
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="h-32 w-32 sm:h-40 sm:w-40 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 shadow-lg">
                    <img 
                      src="/ava.png" 
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight">
                {t.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed max-w-2xl mx-auto">
                {t.description.split('. ').map((part: string, idx: number, arr: string[]) => (
                  <span key={idx} className={idx > 0 ? 'block' : undefined}>
                    {idx < arr.length - 1 ? part + '.' : part}
                  </span>
                ))}
              </p>
              <div className="flex items-center justify-center gap-x-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500 whitespace-nowrap overflow-x-auto">
                <span className="whitespace-nowrap">{t.age}</span>
                <span className="mx-0.5">•</span>
                <span className="whitespace-nowrap">{t.experience}</span>
                <span className="mx-0.5">•</span>
                <span className="whitespace-nowrap">{t.marketing}</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <div className="text-emerald-600 dark:text-emerald-400 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="text-sm font-semibold mb-2">{t.webStack}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.webStackDesc}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <div className="text-emerald-600 dark:text-emerald-400 mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="text-sm font-semibold mb-2">{t.aiStack}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.aiStackDesc}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-8">
              <h2 className="text-base sm:text-lg font-bold mb-3 text-center">{t.products}</h2>
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <Send className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold">{t.product1}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product1Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <MessageCircle className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <div className="text-xs">
                      <span className="font-semibold">{t.product2}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product2Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div className="text-xs">
                      <span className="font-semibold">{t.product3}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product3Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div className="text-xs">
                      <span className="font-semibold">{t.product4}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product4Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div className="text-xs">
                      <span className="font-semibold">{t.product5}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product5Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div className="text-xs">
                      <span className="font-semibold">{t.product6}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product6Desc}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-md transition-colors">
                    <svg className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div className="text-xs">
                      <span className="font-semibold">{t.product7}</span>
                      <span className="text-gray-500 dark:text-gray-500 ml-1">{t.product7Desc}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-12">
              <ChevronDown className="h-5 w-5 text-gray-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Page 2: Services */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl w-full">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 tracking-tight">{t.services}</h2>
            </div>

            <div className="space-y-4 mb-8">
              {/* Service 1 */}
              <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <h3 className="font-bold text-base sm:text-lg">{t.service1.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.service1.description}</p>
                  
                  <button
                    onClick={() => setOpenService(openService === 1 ? null : 1)}
                    className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mb-3"
                  >
                    <span className="underline decoration-2 underline-offset-4">{t.service1.whatYouGet}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openService === 1 ? "rotate-180" : ""}`} />
                  </button>
                  
                  {openService === 1 && (
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 mb-4 ml-2">
                      {t.service1.includes.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{t.service1.price}</div>
                    <a
                      href="https://t.me/alexassiatantbot?start=free_brief"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center"
                    >
                      {t.service1.cta}
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 2 */}
              <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <h3 className="font-bold text-base sm:text-lg">{t.service2.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.service2.description}</p>
                  
                  <button
                    onClick={() => setOpenService(openService === 2 ? null : 2)}
                    className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mb-3"
                  >
                    <span className="underline decoration-2 underline-offset-4">{t.service2.whatYouGet}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openService === 2 ? "rotate-180" : ""}`} />
                  </button>
                  
                  {openService === 2 && (
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 mb-4 ml-2">
                      {t.service2.includes.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{t.service2.price}</div>
                    <a
                      href="https://t.me/alexassiatantbot?start=paid_consult"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center"
                    >
                      {t.service2.cta}
                    </a>
                  </div>
                </div>
              </div>

              {/* Service 3 */}
              <div className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm hover:shadow-md">
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="font-bold text-base sm:text-lg">{t.service3.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t.service3.description}</p>
                  
                  <button
                    onClick={() => setOpenService(openService === 3 ? null : 3)}
                    className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 mb-3"
                  >
                    <span className="underline decoration-2 underline-offset-4">{t.service3.whatYouGet}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${openService === 3 ? "rotate-180" : ""}`} />
                  </button>
                  
                  {openService === 3 && (
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 mb-4 ml-2">
                      {t.service3.includes.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400 whitespace-nowrap">{t.service3.price}</div>
                    <a
                      href={`https://t.me/sapl13?text=${encodeURIComponent(t.telegramProjectMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap text-center"
                    >
                      {t.service3.cta}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-12">
              <ChevronDown className="h-5 w-5 text-gray-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Page 3: Videos + Contact */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl w-full">
            {/* Videos */}
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{lang === 'ru' ? 'Полезный контент' : 'Корисний контент'}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{lang === 'ru' ? 'Обучающие материалы и кейсы по автоматизации' : 'Навчальні матеріали та кейси з автоматизації'}</p>
              <div className="space-y-2">
                {youtubeVideos.map((video, index) => (
                  <a
                    key={index}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center flex-shrink-0">
                        <Youtube className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      </div>
                      <span className="text-sm flex-1">{video.title}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">{t.contacts}</h2>
              
              {/* Telegram Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                {/* Telegram - Quick Free */}
                <a
                  href="https://t.me/alexassiatantbot?start=free_brief"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md text-center group flex flex-col"
                >
                  <Send className="h-5 w-5 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1.5 leading-tight">{t.contactTelegramQuick}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">{t.telegramQuickDesc}</div>
                  <div className="mt-auto">
                    <div className="inline-block px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">{t.telegramQuickFree}</div>
                  </div>
                </a>
                
                {/* Telegram - Paid */}
                <a
                  href="https://t.me/alexassiatantbot?start=paid_consult"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-emerald-500 dark:border-emerald-500 rounded-lg p-4 hover:shadow-lg transition-all text-center group bg-emerald-50/50 dark:bg-emerald-900/10 flex flex-col"
                >
                  <Send className="h-5 w-5 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1.5 leading-tight">{t.contactTelegramPaid}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">{t.telegramPaidDesc}</div>
                  <div className="mt-auto">
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{t.telegramPaidPrice}</div>
                  </div>
                </a>
                
                {/* Telegram - Projects */}
                <a
                  href={`https://t.me/sapl13?text=${encodeURIComponent(t.telegramProjectMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md text-center group flex flex-col"
                >
                  <Send className="h-5 w-5 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1.5 leading-tight">{t.contactTelegramProject}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-3">{t.telegramProjectDesc}</div>
                  <div className="mt-auto">
                    <div className="text-xs text-gray-500 dark:text-gray-500">{t.telegramProjectNote}</div>
                  </div>
                </a>
              </div>
              
              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 text-sm font-medium text-gray-500 dark:text-gray-500 bg-white dark:bg-black">{t.contactsContent}</span>
                </div>
              </div>
              
              {/* Content Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Telegram Channel */}
                <a
                  href="https://t.me/+DvuRP7KBT-dmYmM6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-sm text-center flex flex-col"
                >
                  <Send className="h-5 w-5 mx-auto mb-2.5 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-semibold mb-1 leading-tight">{t.contactTelegramChannel}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{t.telegramChannelDesc}</div>
                </a>
                
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@oleksandrpme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-sm text-center flex flex-col"
                >
                  <Youtube className="h-5 w-5 mx-auto mb-2.5 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-semibold mb-1 leading-tight">{t.contactYoutube}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{t.youtubeDesc}</div>
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/oleksandrp.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-sm text-center flex flex-col"
                >
                  <svg className="h-5 w-5 mx-auto mb-2.5 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div className="text-sm font-semibold mb-1 leading-tight">{t.contactInstagram}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{t.instagramDesc}</div>
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-gray-500 dark:text-gray-500">© 2025 {t.name}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
