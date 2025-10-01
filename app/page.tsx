"use client"

import { Youtube, Send, MessageCircle, Sun, Moon, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { translations, detectLanguage, type Language } from "@/lib/i18n"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [lang, setLang] = useState<Language>('ru')
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    setLang(detectLanguage())
    // Hide loader after mount
    setTimeout(() => setLoading(false), 800)
  }, [])

  const t = translations[lang]
  const [openService, setOpenService] = useState<number | null>(null)

  const youtubeVideos = [
    { title: t.videos[0], url: "https://youtube.com/@your-channel" },
    { title: t.videos[1], url: "https://youtube.com/@your-channel" },
    { title: t.videos[2], url: "https://youtube.com/@your-channel" },
    { title: t.videos[3], url: "https://youtube.com/@your-channel" },
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="text-sm font-medium">{t.name}</div>
          
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'ru' ? 'uk' : 'ru')}
              className="px-3 py-1.5 text-xs font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              {lang === 'ru' ? 'УК' : 'РУ'}
            </button>
            
            {/* Theme Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              >
                {mounted && (
                  theme === "dark" ? <Moon className="h-4 w-4" /> : 
                  theme === "light" ? <Sun className="h-4 w-4" /> : 
                  <Monitor className="h-4 w-4" />
                )}
              </button>
              
              {showThemeMenu && (
                <div className="absolute right-0 mt-2 w-32 py-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg">
                  <button
                    onClick={() => { setTheme('light'); setShowThemeMenu(false) }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Sun className="h-3.5 w-3.5" /> Light
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setShowThemeMenu(false) }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Moon className="h-3.5 w-3.5" /> Dark
                  </button>
                  <button
                    onClick={() => { setTheme('system'); setShowThemeMenu(false) }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                  >
                    <Monitor className="h-3.5 w-3.5" /> System
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-14">
        {/* Page 1: About */}
        <section className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-3xl w-full">
            {/* Hero */}
            <div className="text-center mb-16">
              {/* Avatar */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 shadow-lg">
                    <img 
                      src="/ava.png" 
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold mb-2 tracking-tight">
                {t.name}
              </h1>
              <p className="text-base text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {t.description}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
                <span className="whitespace-nowrap">{t.age}</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{t.experience}</span>
                <span className="hidden sm:inline">•</span>
                <span className="whitespace-nowrap">{t.marketing}</span>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <div className="text-emerald-600 dark:text-emerald-400 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="font-semibold mb-2">{t.webStack}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.webStackDesc}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <div className="text-emerald-600 dark:text-emerald-400 mb-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <div className="font-semibold mb-2">{t.aiStack}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  {t.aiStackDesc}
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 text-center">{t.products}</h2>
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <Send className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold">{t.product1}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product1Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <MessageCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <div>
                      <div className="text-sm font-semibold">{t.product2}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product2Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold">{t.product3}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product3Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold">{t.product4}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product4Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold">{t.product5}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product5Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer">
                    <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold">{t.product6}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product6Desc}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2.5 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg transition-colors cursor-pointer sm:col-span-2">
                    <svg className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold">{t.product7}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">{t.product7Desc}</div>
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">{t.services}</h2>
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
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                      {t.service1.cta}
                    </button>
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
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                      {t.service2.cta}
                    </button>
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
                    <button className="w-full sm:w-auto px-4 sm:px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                      {t.service3.cta}
                    </button>
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
              <h2 className="text-2xl font-bold mb-2">{lang === 'ru' ? 'Полезный контент' : 'Корисний контент'}</h2>
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
              <h2 className="text-2xl font-bold mb-6">{t.contacts}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Telegram - Quick Free */}
                <a
                  href="https://t.me/your-telegram-quick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md text-center group"
                >
                  <Send className="h-6 w-6 mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1">{t.contactTelegramQuick}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t.telegramQuickDesc}</div>
                  <div className="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold">{t.telegramQuickFree}</div>
                </a>
                
                {/* Telegram - Paid */}
                <a
                  href="https://t.me/your-telegram-paid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-emerald-500 dark:border-emerald-500 rounded-xl p-5 hover:shadow-lg transition-all text-center group bg-emerald-50/50 dark:bg-emerald-900/10"
                >
                  <Send className="h-6 w-6 mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1">{t.contactTelegramPaid}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t.telegramPaidDesc}</div>
                  <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{t.telegramPaidPrice}</div>
                </a>
                
                {/* Telegram - Projects */}
                <a
                  href="https://t.me/your-telegram-projects"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all hover:shadow-md text-center group"
                >
                  <Send className="h-6 w-6 mx-auto mb-3 text-emerald-600 dark:text-emerald-400" />
                  <div className="text-sm font-bold mb-1">{t.contactTelegramProject}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{t.telegramProjectDesc}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{t.telegramProjectNote}</div>
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
