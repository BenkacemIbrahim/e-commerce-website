import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WishlistItems } from "@/components/wishlist-items"
import { WishlistRecommendations } from "@/components/wishlist-recommendations"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Wishlist</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-balance">
                Your Wishlist
              </h1>
              <p className="text-muted-foreground mt-2">12 items saved for later</p>
            </div>
          </div>
        </div>

        <WishlistItems />

        <div className="mt-16">
          <WishlistRecommendations />
        </div>
      </main>

      <Footer />
    </div>
  )
}
