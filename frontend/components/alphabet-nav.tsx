"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Brand {
  letter: string
}

interface AlphabetNavProps {
  brands: Brand[]
}

export function AlphabetNav({ brands }: AlphabetNavProps) {
  const [activeSection, setActiveSection] = useState("")

  // Get unique letters from brands
  const letters = Array.from(new Set(brands.map((b) => b.letter))).sort()
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

  const scrollToSection = (letter: string) => {
    const element = document.getElementById(`brand-section-${letter}`)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = letters.map((letter) => ({
        letter,
        element: document.getElementById(`brand-section-${letter}`),
      }))

      const currentSection = sections.find(({ element }) => {
        if (!element) return false
        const rect = element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (currentSection) {
        setActiveSection(currentSection.letter)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [letters])

  return (
    <div className="sticky top-20 z-10 mb-12 overflow-x-auto bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 border-y border-border">
      <div className="flex items-center justify-center gap-2 flex-wrap min-w-max mx-auto">
        {alphabet.map((letter) => {
          const hasLetterBrands = letters.includes(letter)
          const isActive = activeSection === letter

          return (
            <button
              key={letter}
              onClick={() => hasLetterBrands && scrollToSection(letter)}
              disabled={!hasLetterBrands}
              className={cn(
                "h-9 w-9 rounded-md text-sm font-medium transition-all",
                hasLetterBrands ? "hover:bg-muted cursor-pointer" : "text-muted-foreground/30 cursor-not-allowed",
                isActive && hasLetterBrands && "bg-primary text-primary-foreground",
              )}
            >
              {letter}
            </button>
          )
        })}
      </div>
    </div>
  )
}
