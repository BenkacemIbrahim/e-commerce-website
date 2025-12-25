"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const saleProducts = [
  {
    id: "1",
    name: "Air Max Running Shoes",
    brand: "Nike",
    price: 119.99,
    originalPrice: 189.99,
    discount: 37,
    image: "/product-1.png",
    rating: 4.8,
    reviewCount: 342,
  },
  {
    id: "2",
    name: "Performance Training Top",
    brand: "Adidas",
    price: 34.99,
    originalPrice: 59.99,
    discount: 42,
    image: "/adidas-training-top.jpg",
    rating: 4.6,
    reviewCount: 218,
  },
  {
    id: "3",
    name: "Yoga Leggings",
    brand: "Lululemon",
    price: 68.99,
    originalPrice: 98.99,
    discount: 30,
    image: "/black-yoga-leggings.jpg",
    rating: 4.9,
    reviewCount: 567,
  },
  {
    id: "4",
    name: "Training Backpack",
    brand: "Under Armour",
    price: 44.99,
    originalPrice: 79.99,
    discount: 44,
    image: "/under-armour-backpack.jpg",
    rating: 4.7,
    reviewCount: 189,
  },
  {
    id: "5",
    name: "Ultraboost Sneakers",
    brand: "Adidas",
    price: 139.99,
    originalPrice: 219.99,
    discount: 36,
    image: "/adidas-ultraboost-white.jpg",
    rating: 4.8,
    reviewCount: 421,
  },
  {
    id: "6",
    name: "Sports Hoodie",
    brand: "Nike",
    price: 49.99,
    originalPrice: 89.99,
    discount: 44,
    image: "/nike-sports-hoodie-grey.jpg",
    rating: 4.5,
    reviewCount: 276,
  },
  {
    id: "7",
    name: "Running Shorts",
    brand: "Puma",
    price: 24.99,
    originalPrice: 44.99,
    discount: 44,
    image: "/puma-running-shorts.jpg",
    rating: 4.4,
    reviewCount: 154,
  },
  {
    id: "8",
    name: "Gym Duffel Bag",
    brand: "Adidas",
    price: 39.99,
    originalPrice: 69.99,
    discount: 43,
    image: "/adidas-gym-bag-black.jpg",
    rating: 4.6,
    reviewCount: 198,
  },
]

export function SaleProductGrid() {
  const [visibleProducts, setVisibleProducts] = useState(8)

  const loadMore = () => {
    setVisibleProducts((prev) => prev + 4)
  }

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">All Sale Items</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse our complete collection of discounted products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {saleProducts.slice(0, visibleProducts).map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border border-border/50 hover:border-accent/30 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative aspect-square overflow-hidden bg-neutral-50">
                <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground text-sm font-bold px-3 py-1.5 shadow-lg">
                  -{product.discount}%
                </Badge>

                <Link href={`/products/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
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
              </div>

              <div className="p-5">
                <p className="text-sm text-muted-foreground mb-1.5 font-medium uppercase tracking-wider">
                  {product.brand}
                </p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-3 hover:text-accent transition-colors line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({product.reviewCount})</span>
                </div>

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

        {visibleProducts < saleProducts.length && (
          <div className="text-center">
            <Button onClick={loadMore} size="lg" variant="outline" className="px-8 py-6 rounded-full bg-transparent">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
