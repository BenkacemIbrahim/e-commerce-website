"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, ShoppingCart, Star } from "lucide-react"

interface WishlistItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  image: string
  inStock: boolean
  category: string
}

const mockWishlistItems: WishlistItem[] = [
  {
    id: "1",
    name: "Ultra Boost Running Shoes",
    brand: "Adidas",
    price: 189.99,
    originalPrice: 219.99,
    rating: 4.8,
    image: "/premium-athletic-sneakers-display.jpg",
    inStock: true,
    category: "Footwear",
  },
  {
    id: "2",
    name: "Wireless Sport Headphones",
    brand: "Beats",
    price: 299.99,
    rating: 4.6,
    image: "/wireless-headphones.png",
    inStock: true,
    category: "Accessories",
  },
  {
    id: "3",
    name: "Yoga Mat Premium",
    brand: "Lululemon",
    price: 78.0,
    rating: 4.9,
    image: "/purple-yoga-mat.png",
    inStock: true,
    category: "Fitness",
  },
  {
    id: "4",
    name: "Running Shorts",
    brand: "Nike",
    price: 45.0,
    rating: 4.5,
    image: "/black-athletic-shorts.jpg",
    inStock: false,
    category: "Apparel",
  },
  {
    id: "5",
    name: "Smartwatch Sport Edition",
    brand: "Apple",
    price: 429.0,
    rating: 4.7,
    image: "/black-smartwatch.jpg",
    inStock: true,
    category: "Technology",
  },
  {
    id: "6",
    name: "Training Gloves",
    brand: "Under Armour",
    price: 35.0,
    rating: 4.4,
    image: "/black-workout-gloves.jpg",
    inStock: true,
    category: "Accessories",
  },
  {
    id: "7",
    name: "Performance T-Shirt",
    brand: "Puma",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.3,
    image: "/white-sport-shirt.jpg",
    inStock: true,
    category: "Apparel",
  },
  {
    id: "8",
    name: "Gym Duffle Bag",
    brand: "Herschel",
    price: 89.99,
    rating: 4.6,
    image: "/brown-leather-backpack.png",
    inStock: true,
    category: "Bags",
  },
  {
    id: "9",
    name: "Compression Leggings",
    brand: "Gymshark",
    price: 55.0,
    rating: 4.7,
    image: "/black-compression-leggings.png",
    inStock: true,
    category: "Apparel",
  },
  {
    id: "10",
    name: "Foam Roller",
    brand: "TriggerPoint",
    price: 34.99,
    rating: 4.8,
    image: "/black-foam-roller.jpg",
    inStock: true,
    category: "Fitness",
  },
  {
    id: "11",
    name: "Sports Sunglasses",
    brand: "Oakley",
    price: 159.0,
    rating: 4.5,
    image: "/black-sport-sunglasses.jpg",
    inStock: true,
    category: "Accessories",
  },
  {
    id: "12",
    name: "Protein Shaker Bottle",
    brand: "BlenderBottle",
    price: 12.99,
    rating: 4.4,
    image: "/black-shaker-bottle.jpg",
    inStock: true,
    category: "Accessories",
  },
]

export function WishlistItems() {
  const [items, setItems] = useState<WishlistItem[]>(mockWishlistItems)
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))]

  const filteredItems = selectedCategory === "All" ? items : items.filter((item) => item.category === selectedCategory)

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="group">
            <div className="relative">
              <Link href="/" className="block">
                <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-secondary/20">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.originalPrice && (
                    <Badge className="absolute top-3 right-3 bg-destructive">
                      Save ${(item.originalPrice - item.price).toFixed(0)}
                    </Badge>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="text-sm font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-9 w-9 bg-background/90 hover:bg-background"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <Link href="/" className="block mb-3">
              <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
              <h3 className="font-medium mb-1 leading-tight line-clamp-2">{item.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-3 w-3 fill-foreground" />
                <span className="text-sm font-medium">{item.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                {item.originalPrice && (
                  <p className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                )}
              </div>
            </Link>

            <Button variant="outline" size="sm" className="w-full bg-transparent" disabled={!item.inStock}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {item.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
