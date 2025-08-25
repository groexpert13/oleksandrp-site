import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-6",
        hover && "transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-accent/10",
        className,
      )}
    >
      {children}
    </div>
  )
}
