"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Truck, RotateCcw } from "lucide-react"

export function CartSummary() {
  const subtotal = 399.97
  const shipping = 0
  const discount = 20.0
  const total = subtotal + shipping - discount

  return (
    <div className="sticky top-24">
      <div className="rounded-xl border border-border/40 p-6 bg-secondary/20">
        <h2 className="text-xl font-serif font-semibold mb-6">Order Summary</h2>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
          </div>
          <div className="border-t border-border/40 pt-4">
            <div className="flex justify-between">
              <span className="font-semibold text-lg">Total</span>
              <span className="font-semibold text-2xl font-serif">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex gap-2">
            <Input placeholder="Promo code" className="flex-1" />
            <Button variant="outline" className="px-6 bg-transparent">
              Apply
            </Button>
          </div>
        </div>

        <Button className="w-full h-12 text-base font-medium mb-4">Proceed to Checkout</Button>
        <Button variant="outline" className="w-full h-12 text-base font-medium bg-transparent">
          Continue Shopping
        </Button>

        <div className="mt-6 pt-6 border-t border-border/40 space-y-3">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Secure Payment</p>
              <p className="text-xs text-muted-foreground">100% secure transactions</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Easy Returns</p>
              <p className="text-xs text-muted-foreground">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
