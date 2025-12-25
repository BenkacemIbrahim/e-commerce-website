"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, Heart } from "lucide-react"

interface CartItem {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  size: string
  color: string
  quantity: number
  image: string
  inStock: boolean
}

const mockCartItems: CartItem[] = [
  {
    id: "1",
    name: "Air Max Running Shoes",
    brand: "Nike",
    price: 179.99,
    originalPrice: 199.99,
    size: "42",
    color: "White/Black",
    quantity: 1,
    image: "/premium-athletic-sneakers-display.jpg",
    inStock: true,
  },
  {
    id: "2",
    name: "Performance Training Jacket",
    brand: "Adidas",
    price: 129.99,
    size: "M",
    color: "Black",
    quantity: 2,
    image: "/sleek-black-athletic-jacket.jpg",
    inStock: true,
  },
  {
    id: "3",
    name: "Classic Leather Backpack",
    brand: "Herschel",
    price: 89.99,
    size: "One Size",
    color: "Tan",
    quantity: 1,
    image: "/tan-leather-backpack-minimal.jpg",
    inStock: false,
  },
]

export function CartItems() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems)

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border/40">
        <h2 className="text-lg font-medium">Items ({items.length})</h2>
      </div>

      <div className="space-y-6">
        {items.map((item) => (
          <div key={item.id} className="group relative">
            <div className="flex gap-6 p-6 rounded-xl border border-border/40 bg-background hover:border-border/60 transition-colors">
              <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-secondary/30">
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{item.brand}</p>
                    <h3 className="font-medium text-lg leading-tight mb-2">{item.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Size: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {item.originalPrice && (
                      <p className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</p>
                    )}
                    <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {!item.inStock && <p className="text-sm text-destructive mb-3 font-medium">Currently out of stock</p>}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-border/40">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
