"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Zap } from "lucide-react"
import Link from "next/link"

const flashDeals = [
  {
    id: "1",
    name: "Premium Running Shoes",
    brand: "Nike",
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    image: "/nike-running-shoes-white.jpg",
    stock: 12,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    brand: "Sony",
    price: 199.99,
    originalPrice: 349.99,
    discount: 43,
    image: "/wireless-headphones.png",
    stock: 8,
  },
  {
    id: "3",
    name: "Leather Backpack",
    brand: "Herschel",
    price: 69.99,
    originalPrice: 119.99,
    discount: 42,
    image: "/brown-leather-backpack.png",
    stock: 15,
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    brand: "Garmin",
    price: 249.99,
    originalPrice: 399.99,
    discount: 38,
    image: "/garmin-fitness-watch-black.jpg",
    stock: 6,
  },
]

export function FlashDeals() {
  return (
    <section className="py-16 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                <Zap className="h-5 w-5" />
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground">Flash Deals</h2>
            </div>
            <p className="text-muted-foreground text-lg">Hurry! Limited quantities available</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashDeals.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 shadow-lg">
                  -{product.discount}%
                </Badge>

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
                    className="rounded-full shadow-xl backdrop-blur-sm bg-background/90 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full shadow-xl backdrop-blur-sm bg-background/90 hover:bg-background"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Only {product.stock} left!</p>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${(product.stock / 20) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">
                  {product.brand}
                </p>
                <Link href="/">
                  <h3 className="font-semibold text-lg mb-3 hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
                  <span className="text-base text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
