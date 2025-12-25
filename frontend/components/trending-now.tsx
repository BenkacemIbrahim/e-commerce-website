"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp } from "lucide-react"
import Link from "next/link"

const trendingItems = [
  {
    name: "Sustainable Activewear",
    description: "Eco-friendly performance wear",
    image: "/sustainable-athletic-wear-green.jpg",
    trend: "+145%",
  },
  {
    name: "Retro Sneakers",
    description: "Vintage styles making comeback",
    image: "/retro-sneakers-vintage.jpg",
    trend: "+89%",
  },
  {
    name: "Minimalist Design",
    description: "Clean lines, maximum impact",
    image: "/minimalist-sneakers-clean.jpg",
    trend: "+67%",
  },
  {
    name: "Tech-Enhanced Gear",
    description: "Smart fabrics, better performance",
    image: "/tech-enhanced-smart-shoes.jpg",
    trend: "+112%",
  },
]

export function TrendingNow() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-12">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h2 className="font-serif text-4xl md:text-5xl font-bold">Trending Now</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingItems.map((item) => (
            <Link key={item.name} href="/">
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground font-bold">
                    {item.trend}
                  </Badge>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-xl font-bold mb-1">{item.name}</h3>
                    <p className="text-sm text-white/90">{item.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
