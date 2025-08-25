"use client"
import { Brain, Bot, Workflow, Database, LineChart, PlugZap } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const { t } = useTranslation()

  const services = [
    {
      icon: Brain,
      title: t("services.items.strategy.title"),
      desc: t("services.items.strategy.desc"),
    },
    {
      icon: Bot,
      title: t("services.items.agents.title"),
      desc: t("services.items.agents.desc"),
    },
    {
      icon: Workflow,
      title: t("services.items.rag.title"),
      desc: t("services.items.rag.desc"),
    },
    {
      icon: Database,
      title: t("services.items.data.title"),
      desc: t("services.items.data.desc"),
    },
    {
      icon: LineChart,
      title: t("services.items.mlops.title"),
      desc: t("services.items.mlops.desc"),
    },
    {
      icon: PlugZap,
      title: t("services.items.integrate.title"),
      desc: t("services.items.integrate.desc"),
    },
  ]

  return (
    <Section id="services" background="default">
      <SectionHeader title={t("services.title")} subtitle={t("services.subtitle")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {services.map((svc, idx) => (
          <GlassCard key={idx} hover className="h-full">
            <div className="flex items-start gap-4 h-full">
              <svc.icon className="h-6 w-6 text-accent mt-1" />
              <div className="flex flex-col">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{svc.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
        <Button asChild size="lg" className="glass">
          <a href="#contact">{t("services.ctaPrimary")}</a>
        </Button>
        <Button asChild size="lg" variant="outline" className="glass bg-transparent">
          <a href="#projects">{t("services.ctaSecondary")}</a>
        </Button>
      </div>
    </Section>
  )
}


