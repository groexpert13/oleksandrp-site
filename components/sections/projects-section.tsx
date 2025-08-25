"use client"
import { ExternalLink, Github } from "lucide-react"
import { useTranslation } from "@/lib/i18n/language-context"
import { Section } from "@/components/ui/section"
import { SectionHeader } from "@/components/ui/section-header"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function ProjectsSection() {
  const { t } = useTranslation()

  const projects = [
    {
      title: "AI Support Assistant",
      description: "RAG chatbot grounded in docs and tickets; reduces first-response time by 65%",
      image: "/modern-ecommerce-interface.png",
      technologies: ["Next.js", "TypeScript", "OpenAI", "Pinecone", "FastAPI"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Process Automation Agent",
      description: "Agent orchestrates CRM updates, emails, and Slack with human-in-the-loop",
      image: "/task-management-dashboard.png",
      technologies: ["Python", "LangChain", "Celery", "PostgreSQL", "Slack API"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Data Pipeline & Analytics",
      description: "Event-based ETL and dashboards powering automation KPIs and evaluations",
      image: "/ai-chat-interface.png",
      technologies: ["Kafka", "dbt", "ClickHouse", "Superset", "Docker"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ]

  return (
    <Section id="projects">
      <SectionHeader title={t("projects.title")} subtitle={t("projects.subtitle")} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {projects.map((project, index) => (
          <GlassCard key={index} hover className="group h-full flex flex-col">
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-lg mb-4 h-48">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Project Info */}
            <div className="space-y-4 flex-1 flex flex-col">
              <div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-[1fr_auto] gap-2 pt-3 mt-auto items-center border-t border-border/30">
                <Button size="sm" variant="outline" className="justify-center" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("projects.liveDemo")}
                  </a>
                </Button>
                <Button size="sm" variant="ghost" className="h-9 w-9 p-0" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </Section>
  )
}
