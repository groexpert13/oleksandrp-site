"use client"
import { useEffect } from "react"

interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  meta?: boolean
  shift?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const matchesKey = e.key.toLowerCase() === shortcut.key.toLowerCase()
        const matchesCtrl = shortcut.ctrl ? e.ctrlKey : !e.ctrlKey
        const matchesMeta = shortcut.meta ? e.metaKey : !e.metaKey
        const matchesShift = shortcut.shift ? e.shiftKey : !e.shiftKey
        const matchesModifier = (shortcut.ctrl || shortcut.meta) ? (e.ctrlKey || e.metaKey) : true

        if (matchesKey && matchesModifier && matchesShift) {
          e.preventDefault()
          shortcut.action()
          break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [shortcuts])
}

// Global keyboard shortcuts
export function GlobalKeyboardShortcuts() {
  const shortcuts: KeyboardShortcut[] = [
    {
      key: "k",
      ctrl: true,
      action: () => {
        // Open assistant
        window.dispatchEvent(new CustomEvent("assistant-open"))
      },
      description: "Open AI Assistant"
    },
    {
      key: "j",
      ctrl: true,
      action: () => {
        // Scroll to next section
        const sections = ["hero", "about", "services", "projects", "experience", "contact"]
        const currentSection = getCurrentSection(sections)
        const nextIndex = Math.min(currentSection + 1, sections.length - 1)
        document.getElementById(sections[nextIndex])?.scrollIntoView({ behavior: "smooth" })
      },
      description: "Navigate to next section"
    },
    {
      key: "k",
      ctrl: true,
      shift: true,
      action: () => {
        // Scroll to previous section
        const sections = ["hero", "about", "services", "projects", "experience", "contact"]
        const currentSection = getCurrentSection(sections)
        const prevIndex = Math.max(currentSection - 1, 0)
        document.getElementById(sections[prevIndex])?.scrollIntoView({ behavior: "smooth" })
      },
      description: "Navigate to previous section"
    },
    {
      key: "t",
      ctrl: true,
      action: () => {
        // Toggle theme
        const themeToggle = document.querySelector('[aria-label="Toggle theme"]') as HTMLButtonElement
        themeToggle?.click()
      },
      description: "Toggle theme"
    }
  ]

  useKeyboardShortcuts(shortcuts)
  return null
}

function getCurrentSection(sections: string[]): number {
  const scrollY = window.scrollY + 100
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && section.offsetTop <= scrollY) {
      return i
    }
  }
  return 0
}
