"use client"
import { useEffect, useState } from "react"
import { LoadingSpinner } from "./loading-spinner"

export function SplashScreen() {
  const [visible, setVisible] = useState(true)
  const [fadingOut, setFadingOut] = useState(false)

  useEffect(() => {
    // Check if page has been visited before
    const hasVisited = sessionStorage.getItem('has-visited-page')
    
    if (hasVisited) {
      // Skip splash screen for return visits in the same session
      setVisible(false)
      return
    }

    // Mark as visited
    sessionStorage.setItem('has-visited-page', 'true')

    // Start fading out after a short delay
    const fadeTimer = setTimeout(() => {
      setFadingOut(true)
    }, 600)

    // Remove completely after fade animation
    const removeTimer = setTimeout(() => {
      setVisible(false)
    }, 1000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div 
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-background/90 backdrop-blur-lg transition-opacity duration-400 ${
        fadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </div>
  )
}


