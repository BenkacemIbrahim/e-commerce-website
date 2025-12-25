"use client"

import { SectionHeader } from "@/components/section-header"
import { ProductGrid } from "@/components/product-grid"

const bestSellingProducts = [
  {
    id: "1",
    name: "Air Max 270 Essential",
    brand: "Nike",
    price: 149.99,
    originalPrice: 199.99,
    image: "/white-women-sneakers.jpg",
    rating: 4.8,
    reviewCount: 234,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Ultraboost 23",
    brand: "Adidas",
    price: 189.99,
    image: "/adidas-ultraboost-white.jpg",
    rating: 4.9,
    reviewCount: 412,
    badge: "Best Seller",
  },
  {
    id: "3",
    name: "Classic Leather",
    brand: "Reebok",
    price: 89.99,
    image: "/white-leather-sneakers.png",
    rating: 4.7,
    reviewCount: 189,
    badge: "Best Seller",
  },
  {
    id: "4",
    name: "Chuck Taylor All Star",
    brand: "Converse",
    price: 65.0,
    image: "/black-canvas-sneakers.jpg",
    rating: 4.6,
    reviewCount: 567,
    badge: "Best Seller",
  },
]

export function BestSellers() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Best Sellers"
          description="Our most loved footwear, chosen by thousands of happy customers"
          viewAllLink="/sale"
        />
        <ProductGrid products={bestSellingProducts} />
      </div>
    </section>
  )
}
