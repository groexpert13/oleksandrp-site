import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
  background?: "default" | "muted"
}

export function Section({ children, className, id, background = "default" }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20 py-16 sm:py-20 lg:py-24", background === "muted" && "bg-muted/30", className)}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  )
}
