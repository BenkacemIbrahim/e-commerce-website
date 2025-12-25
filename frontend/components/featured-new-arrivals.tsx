"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"

const featuredProducts = [
  {
    id: "1",
    name: "Premium Performance Sneakers",
    brand: "Nike",
    price: 189.99,
    image: "/premium-white-athletic-sneakers.jpg",
    badge: "NEW",
  },
  {
    id: "2",
    name: "Lightweight Running Jacket",
    brand: "Adidas",
    price: 159.99,
    image: "/sleek-black-athletic-jacket.jpg",
    badge: "HOT",
  },
  {
    id: "3",
    name: "Classic Leather Backpack",
    brand: "Herschel",
    price: 129.99,
    image: "/tan-leather-backpack-minimal.jpg",
    badge: "NEW",
  },
]

export function FeaturedNewArrivals() {
  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-balance">Featured This Week</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Handpicked selections from our latest drops. Premium quality meets cutting-edge design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden bg-background">
                <div className="absolute top-4 left-4 z-10 bg-foreground text-background px-4 py-1.5 text-xs font-bold rounded-full">
                  {product.badge}
                </div>

                <Link href="/">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </Link>

                <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-xl bg-background hover:bg-background/90"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-xl bg-background hover:bg-background/90"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                  {product.brand}
                </p>
                <Link href="/">
                  <h3 className="font-semibold text-xl mb-4 hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </Link>
                <div className="text-2xl font-bold tracking-tight">${product.price}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
