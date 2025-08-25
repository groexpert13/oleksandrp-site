"use client"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "./loading-spinner"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 800) // fade after short delay
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-lg transition-opacity">
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  )
}


