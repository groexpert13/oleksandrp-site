import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  className?: string
  centered?: boolean
}

export function SectionHeader({ title, subtitle, className, centered = true }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", centered && "text-center", className)}>
      <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">{title}</h2>
      {subtitle && <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}
