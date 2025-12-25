"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product-grid"

const allProducts = [
  {
    id: "1",
    name: "Air Max Vision Sneakers",
    brand: "Nike",
    price: 159.99,
    image: "/nike-air-max-sneakers-white.jpg",
    rating: 4.8,
    reviewCount: 124,
    badge: "NEW",
  },
  {
    id: "2",
    name: "Ultraboost 22 Running Shoes",
    brand: "Adidas",
    price: 189.99,
    image: "/adidas-ultraboost-black-running-shoes.jpg",
    rating: 4.9,
    reviewCount: 98,
    badge: "NEW",
  },
  {
    id: "3",
    name: "Classic Cotton Hoodie",
    brand: "Champion",
    price: 79.99,
    image: "/grey-hoodie-minimalist.jpg",
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: "4",
    name: "Performance Leggings",
    brand: "Lululemon",
    price: 98.99,
    image: "/black-athletic-leggings.jpg",
    rating: 4.9,
    reviewCount: 203,
    badge: "HOT",
  },
  {
    id: "5",
    name: "Training Shorts Pro",
    brand: "Under Armour",
    price: 49.99,
    image: "/athletic-training-shorts.jpg",
    rating: 4.7,
    reviewCount: 87,
  },
  {
    id: "6",
    name: "Windbreaker Jacket",
    brand: "The North Face",
    price: 149.99,
    image: "/blue-windbreaker-jacket.jpg",
    rating: 4.8,
    reviewCount: 142,
    badge: "NEW",
  },
  {
    id: "7",
    name: "Dri-FIT Training Top",
    brand: "Nike",
    price: 69.99,
    image: "/athletic-training-shirt.jpg",
    rating: 4.5,
    reviewCount: 91,
  },
  {
    id: "8",
    name: "Gel-Kayano 29",
    brand: "ASICS",
    price: 169.99,
    image: "/asics-running-shoes.jpg",
    rating: 4.9,
    reviewCount: 167,
    badge: "NEW",
  },
]

export function NewArrivalsGrid() {
  const [filter, setFilter] = useState("all")
  const [visibleCount, setVisibleCount] = useState(8)

  const filters = [
    { label: "All", value: "all" },
    { label: "Footwear", value: "footwear" },
    { label: "Apparel", value: "apparel" },
    { label: "Accessories", value: "accessories" },
  ]

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8)
  }

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">All New Arrivals</h2>
            <p className="text-muted-foreground">
              Showing {Math.min(visibleCount, allProducts.length)} of {allProducts.length} products
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                onClick={() => setFilter(f.value)}
                className="px-6"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <ProductGrid products={allProducts.slice(0, visibleCount)} columns={4} />

        {visibleCount < allProducts.length && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" onClick={handleLoadMore} className="px-8 bg-transparent">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
