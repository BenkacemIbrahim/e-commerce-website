"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export function SaleHero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 30,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent/10 via-background to-background">
      <div className="absolute inset-0 bg-[url('/abstract-minimalist-geometric-pattern.jpg')] opacity-5"></div>

      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-6 py-2.5 rounded-full mb-8 border border-accent/30">
            <Clock className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-accent-foreground">Limited Time Event</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 leading-tight text-balance">
            Seasonal Sale
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed text-pretty">
            Discover exceptional pieces at extraordinary prices. Up to 60% off select styles.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
            <div className="bg-card border border-border rounded-2xl p-6 min-w-[100px] shadow-lg">
              <div className="text-4xl font-bold text-foreground mb-1">{timeLeft.days}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Days</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 min-w-[100px] shadow-lg">
              <div className="text-4xl font-bold text-foreground mb-1">{timeLeft.hours}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Hours</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 min-w-[100px] shadow-lg">
              <div className="text-4xl font-bold text-foreground mb-1">{timeLeft.minutes}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Minutes</div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 min-w-[100px] shadow-lg">
              <div className="text-4xl font-bold text-foreground mb-1">{timeLeft.seconds}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Seconds</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="px-8 py-6 text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Shop All Sale
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-base font-semibold rounded-full bg-transparent"
            >
              View Categories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
