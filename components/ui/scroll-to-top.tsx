"use client"
import { useEffect, useState, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "./button"
import { throttle, createEventListener, prefersReducedMotion } from "@/lib/utils/performance"

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.pageYOffset > 300)
  }, [])

  const throttledToggleVisibility = useCallback(throttle(toggleVisibility, 100), [toggleVisibility])

  useEffect(() => {
    return createEventListener(window, "scroll", throttledToggleVisibility, { passive: true })
  }, [throttledToggleVisibility])

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }, [])

  if (!isVisible) {
    return null
  }

  return (
    <Button
      onClick={scrollToTop}
      size="sm"
      className="fixed bottom-20 sm:bottom-6 right-6 z-50 glass rounded-full p-3 shadow-lg hover:scale-110 transition-all duration-200"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  )
}
