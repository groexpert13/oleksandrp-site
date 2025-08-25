"use client"
import { ArrowDown, Github, Linkedin, Mail, Calendar } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { Section } from "@/components/ui/section"
import { siteLinks } from "@/lib/utils"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <Section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="text-center max-w-4xl mx-auto">
        {/* Greeting */}
        <div className="mb-6 animate-fade-in-up">
          <p className="text-lg sm:text-xl text-muted-foreground mb-2">{t("hero.greeting")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 leading-tight">
            {t("hero.name")}
          </h1>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-accent mb-6">
            {t("hero.title")}
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          {t("hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up animation-delay-400">
          <Button size="lg" className="glass text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto" asChild>
            <a href="#contact">
            <Mail className="mr-2 h-5 w-5" />
            {t("hero.cta")}
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="glass text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent w-full sm:w-auto"
            asChild
          >
            <a href="#services">
              {t("hero.viewWork")}
              <ArrowDown className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="ghost" size="lg" className="w-full sm:w-auto" asChild>
            <a href={siteLinks.calendly} target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-5 w-5" /> Book a call
            </a>
          </Button>
        </div>
        <div className="sr-only">All interactive elements are optimized for touch devices.</div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 sm:space-x-6 animate-fade-in-up animation-delay-600">
          <a
            href={siteLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:scale-110 transition-transform duration-200"
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a
            href={siteLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="glass p-3 rounded-full hover:scale-110 transition-transform duration-200"
          >
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a
            href={`mailto:${siteLinks.email}`}
            className="glass p-3 rounded-full hover:scale-110 transition-transform duration-200"
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>
      </div>
    </Section>
  )
}
