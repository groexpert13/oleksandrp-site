"use client"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { useScrollSpy } from "@/hooks/use-scroll-spy"
import { ThemeToggle } from "./theme-toggle"
import { LanguageToggle } from "./language-toggle"
import { siteLinks } from "@/lib/utils"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"

export function Header() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { key: "nav.home", href: "#home", id: "home" },
    { key: "nav.about", href: "#about", id: "about" },
    { key: "nav.services", href: "#services", id: "services" },
    { key: "nav.projects", href: "#projects", id: "projects" },
    { key: "nav.experience", href: "#experience", id: "experience" },
    { key: "nav.contact", href: "#contact", id: "contact" },
  ]

  const activeSection = useScrollSpy(navItems.map((item) => item.id))

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="font-heading font-bold text-xl text-foreground hover:text-accent transition-colors"
            >
              oleksandrp.me
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  "text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium relative",
                  activeSection === item.id && "text-accent",
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {t(item.key)}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                )}
              </a>
            ))}
            <a
              href={siteLinks.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-accent hover:text-foreground transition-colors"
            >
              Book a call
            </a>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageToggle />

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden glass"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
              <span className="sr-only">{t("common.menu")}</span>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card mt-2 rounded-lg">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm font-medium rounded-md hover:bg-accent/10",
                    activeSection === item.id && "text-accent bg-accent/10",
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
