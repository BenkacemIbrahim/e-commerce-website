"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Men's New Arrivals",
    description: "Fresh styles for every occasion",
    image: "/mens-fashion-athletic-wear-modern.jpg",
    link: "/men",
    count: "85+ Items",
  },
  {
    name: "Women's New Arrivals",
    description: "Elegant designs, effortless style",
    image: "/womens-fashion-athletic-wear-modern.jpg",
    link: "/women",
    count: "92+ Items",
  },
  {
    name: "Kids New Arrivals",
    description: "Fun and functional for active kids",
    image: "/kids-fashion-athletic-wear-colorful.jpg",
    link: "/kids",
    count: "73+ Items",
  },
]

export function CategoryHighlights() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Shop by Category</h2>
          <p className="text-lg text-muted-foreground text-pretty">Explore our latest arrivals organized by category</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
                  {category.count}
                </div>
                <h3 className="font-serif text-3xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90 mb-4">{category.description}</p>
                <Button variant="secondary" className="group-hover:translate-x-2 transition-transform duration-300">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
