"use client"
import { Calendar, MapPin } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"

export function ExperienceSection() {
  const { t } = useTranslation()

  const experiences = [
    // Earliest → Latest
    {
      title: "Digital Marketing Specialist",
      company: "Freelance / Agency Projects",
      location: "Kyiv, Ukraine",
      period: "2017 - 2019",
      description:
        "Formal education in advertising and hands-on experience in digital marketing: campaign strategy, performance ads, analytics, and CRO. This foundation informs data-driven product and AI work.",
      technologies: ["Google Ads", "Meta Ads", "GA4", "SEO", "CRO"],
    },
    {
      title: "Frontend Developer",
      company: "StartupHub",
      location: "Lviv, Ukraine",
      period: "2019 - 2020",
      description:
        "Built responsive web apps; focused on performance and DX. Contributed to early automation scripts and analytics dashboards.",
      technologies: ["JavaScript", "React", "Sass", "Webpack", "Git"],
    },
    {
      title: "Full-Stack Developer",
      company: "Digital Solutions Inc",
      location: "Kyiv, Ukraine",
      period: "2020 - 2022",
      description:
        "Implemented integrations and microservices, introduced data pipelines and groundwork for automation (events, queues), improved UX for internal tools.",
      technologies: ["React", "Node.js", "Kafka", "MongoDB", "Docker"],
    },
    {
      title: "AI & Automation Engineer",
      company: "Tech Innovations Ltd",
      location: "Remote",
      period: "2022 - " + t("experience.present"),
      description:
        "Delivered production AI assistants (RAG/agents), automated workflows, and observability. Owned discovery → delivery, aligning ROI and compliance.",
      technologies: ["Python", "FastAPI", "LangChain", "OpenAI", "Pinecone", "AWS"],
    },
  ]

  return (
    <Section id="experience">
      <SectionHeader title={t("experience.title")} subtitle={t("experience.subtitle")} />

      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <GlassCard key={index} hover className="relative">
              <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                {/* Timeline column */}
                <div className="relative hidden sm:block w-8">
                  <div className="absolute left-1/2 -translate-x-1/2 top-4 w-3 h-3 bg-accent rounded-full" />
                  {index !== experiences.length - 1 && (
                    <div className="absolute left-1/2 -translate-x-1/2 top-6 bottom-4 w-px bg-gradient-to-b from-accent to-transparent" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">{exp.title}</h3>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Section>
  )
}
