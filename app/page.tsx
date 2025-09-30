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

  useEffect(() => {
    setMounted(true)
    setLang(detectLanguage())
  }, [])

  const t = translations[lang]

  const youtubeVideos = [
    { title: t.videos[0], url: "https://youtube.com/@your-channel" },
    { title: t.videos[1], url: "https://youtube.com/@your-channel" },
    { title: t.videos[2], url: "https://youtube.com/@your-channel" },
    { title: t.videos[3], url: "https://youtube.com/@your-channel" },
  ]

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
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                <span>{t.age}</span>
                <span>•</span>
                <span>{t.experience}</span>
                <span>•</span>
                <span>{t.marketing}</span>
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
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-emerald-600 dark:text-emerald-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{t.service1.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.service1.description}</p>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">{t.service1.price}</div>
                  </div>
                </div>
                <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {t.service1.cta}
                </button>
              </div>

              {/* Service 2 */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-emerald-600 dark:text-emerald-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{t.service2.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.service2.description}</p>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">{t.service2.price}</div>
                  </div>
                </div>
                <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {t.service2.cta}
                </button>
              </div>

              {/* Service 3 */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-emerald-600 dark:text-emerald-400 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{t.service3.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t.service3.description}</p>
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">{t.service3.price}</div>
                  </div>
                </div>
                <button className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
                  {t.service3.cta}
                </button>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <a
                  href="https://t.me/your-telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-center"
                >
                  <Send className="h-5 w-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-medium">Telegram</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.telegramDesc}</div>
                </a>
                <a
                  href="https://youtube.com/@your-channel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-center"
                >
                  <Youtube className="h-5 w-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-medium">YouTube</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.youtubeDesc}</div>
                </a>
                <a
                  href="https://instagram.com/your-instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-center"
                >
                  <svg className="h-5 w-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div className="text-sm font-medium">{t.contactInstagram}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.instagramDesc}</div>
                </a>
                <a
                  href="https://t.me/your-bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-200 dark:border-gray-800 rounded-lg p-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors text-center"
                >
                  <MessageCircle className="h-5 w-5 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                  <div className="text-sm font-medium">{t.contactBot}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">{t.botDesc}</div>
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
