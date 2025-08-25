"use client"
import { useEffect, useState, useCallback, useRef } from "react"
import { throttle, createEventListener } from "@/lib/utils/performance"

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const [activeSection, setActiveSection] = useState<string>("")
  const sectionsCache = useRef<Map<string, HTMLElement>>(new Map())

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset

    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const sectionId = sectionIds[i]
      let section = sectionsCache.current.get(sectionId)
      
      if (!section) {
        const element = document.getElementById(sectionId)
        if (element) {
          section = element
          sectionsCache.current.set(sectionId, section)
        }
      }
      
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sectionId)
        break
      }
    }
  }, [sectionIds, offset])

  const throttledScroll = useCallback(throttle(handleScroll, 100), [handleScroll])

  useEffect(() => {
    // Clear cache when sectionIds change
    sectionsCache.current.clear()
    
    const cleanup = createEventListener(window, "scroll", throttledScroll, { passive: true })
    handleScroll() // Call once to set initial state

    return cleanup
  }, [throttledScroll, handleScroll])

  return activeSection
}
