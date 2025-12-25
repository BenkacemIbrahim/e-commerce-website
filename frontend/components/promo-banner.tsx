import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function PromoBanner() {
  return (
    <div className="relative bg-accent/20 rounded-2xl overflow-hidden mt-24 border border-border/40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="p-12 lg:p-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-semibold mb-4 leading-tight text-balance">
            Discover Premium Brands with Exclusive Discounts
          </h2>
          <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
            Shop from our curated selection of top brands offering special savings of 25% or more.
          </p>
          <div className="flex gap-3 mb-8">
            <div className="flex -space-x-2">
              {["M", "C", "C", "P"].map((letter, i) => (
                <div
                  key={i}
                  className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center font-bold border-2 border-background"
                >
                  {letter}
                </div>
              ))}
            </div>
          </div>
          <Button size="lg" className="h-12 px-8 text-base font-medium">
            View all brands
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="relative h-64 lg:h-full min-h-[400px] bg-secondary/30">
          <Image src="/premium-athletic-sneakers-display.jpg" alt="Premium sneakers collection" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
