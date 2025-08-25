"use client"
import { Code, Database, Globe, Brain } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { AnimatedCounter } from "@/components/ui/animated-counter"

export function AboutSection() {
  const { t } = useTranslation()

  const skills = [
    {
      icon: Code,
      title: "Frontend",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      icon: Database,
      title: "Backend",
      technologies: ["Python", "FastAPI", "Node.js", "PostgreSQL", "MongoDB", "Redis"],
    },
    {
      icon: Brain,
      title: "AI Stack",
      technologies: ["OpenAI", "LangChain", "LlamaIndex", "Vector DBs", "RAG", "Agents"],
    },
    {
      icon: Globe,
      title: "Web Technologies",
      technologies: ["REST", "GraphQL", "WebSockets", "PWA", "Auth"],
    },
  ]

  const stats = [
    { number: 5, suffix: "+", label: t("about.experience") },
    { number: 50, suffix: "+", label: t("about.projects") },
    { number: 30, suffix: "+", label: t("about.clients") },
  ]

  return (
    <Section id="about" background="muted">
      <SectionHeader title={t("about.title")} />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
        {/* Description */}
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t("about.description")}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl font-bold text-accent mb-2">
                  <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div>
          <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">{t("about.skills")}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {skills.map((skill, index) => (
              <GlassCard key={index} hover className="text-center h-full">
                <skill.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <h4 className="font-semibold text-foreground mb-2">{skill.title}</h4>
                <div className="flex flex-wrap gap-1 justify-center">
                  {skill.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
