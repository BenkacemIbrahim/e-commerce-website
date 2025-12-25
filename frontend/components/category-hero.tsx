"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface CategoryHeroProps {
  title: string
  description: string
  imageUrl: string
  ctaText?: string
  ctaLink?: string
}

export function CategoryHero({ title, description, imageUrl, ctaText = "Shop Now", ctaLink = "#" }: CategoryHeroProps) {
  return (
    <section className="relative h-[500px] lg:h-[600px] overflow-hidden bg-neutral-100">
      <div className="absolute inset-0">
        <img src={imageUrl || "/placeholder.svg"} alt={title} className="w-full h-full object-cover opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="flex flex-col justify-center h-full max-w-3xl">
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 text-balance tracking-tight">
            {title}
          </h1>
          <p className="text-xl lg:text-2xl text-white/95 mb-10 text-pretty leading-relaxed max-w-2xl">{description}</p>
          <div>
            <Button
              size="lg"
              className="text-lg px-10 py-7 group bg-primary hover:bg-primary/90 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
