"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReviewsList } from "./reviews-list"
import { RatingBreakdown } from "./rating-breakdown"

export function ProductTabs() {
  return (
    <Tabs defaultValue="reviews" className="mt-20">
      <TabsList className="grid w-full max-w-lg grid-cols-3 h-12 bg-secondary/50">
        <TabsTrigger value="details" className="data-[state=active]:bg-background">
          Details
        </TabsTrigger>
        <TabsTrigger value="reviews" className="data-[state=active]:bg-background">
          Reviews
        </TabsTrigger>
        <TabsTrigger value="discussion" className="data-[state=active]:bg-background">
          Discussion
        </TabsTrigger>
      </TabsList>

      <TabsContent value="details" className="mt-10">
        <div className="max-w-3xl space-y-8">
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Product Description</h3>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              The Reebok Zig Kinetica 3 features a distinctive zigzag sole design that provides exceptional cushioning
              and energy return. Perfect for both athletic performance and casual wear, these shoes combine cutting-edge
              technology with modern style.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-semibold mb-4">Features</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-1">•</span>
                <span>Zig Energy Shell for responsive cushioning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-1">•</span>
                <span>Breathable mesh upper with synthetic overlays</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-1">•</span>
                <span>Durable rubber outsole with zigzag design</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-foreground mt-1">•</span>
                <span>Comfortable foam midsole</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <ReviewsList />
          </div>
          <div>
            <RatingBreakdown />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="discussion" className="mt-10">
        <div className="max-w-3xl space-y-6">
          <h3 className="font-serif text-2xl font-semibold">Product Discussion</h3>
          <p className="text-muted-foreground">
            Join the conversation about this product. Ask questions and get answers from other customers.
          </p>
          <div className="bg-secondary/30 rounded-lg p-12 text-center border border-border/40">
            <p className="text-sm text-muted-foreground">No discussions yet. Be the first to start one!</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  )
}
