"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 via-background to-neutral-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
          <div className="space-y-8">
            <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold rounded-full">
              Premium Collection
            </Badge>

            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Step Into
              <br />
              <span className="text-primary">Your Style</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Discover premium footwear that combines cutting-edge design with exceptional comfort. Elevate your
              wardrobe with styles that make a statement.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="px-8 text-base">
                Shop Collection
              </Button>
              <Button size="lg" variant="outline" className="px-8 text-base bg-transparent">
                Explore Brands
              </Button>
            </div>

            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold font-serif">500+</div>
                <div className="text-sm text-muted-foreground">Premium Styles</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif">50+</div>
                <div className="text-sm text-muted-foreground">Top Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold font-serif">4.9</div>
                <div className="text-sm text-muted-foreground">Customer Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src="/hero-sneakers-collection.jpg" alt="Hero Collection" className="w-full h-full object-cover" />
            </div>

            <div className="absolute -bottom-8 -left-8 bg-card border border-border/50 rounded-2xl p-6 shadow-2xl backdrop-blur-sm hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-sm font-semibold">HOT</span>
                </div>
                <div>
                  <div className="font-semibold">Hot This Season</div>
                  <div className="text-sm text-muted-foreground">Trending Now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
