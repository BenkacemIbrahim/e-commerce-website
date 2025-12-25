import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewArrivalsHero } from "@/components/new-arrivals-hero"
import { FeaturedNewArrivals } from "@/components/featured-new-arrivals"
import { NewArrivalsGrid } from "@/components/new-arrivals-grid"
import { CategoryHighlights } from "@/components/category-highlights"
import { TrendingNow } from "@/components/trending-now"

export const metadata = {
  title: "New Arrivals - Latest Fashion & Sportswear",
  description: "Discover the latest arrivals in fashion and sportswear. Shop new styles for men, women, and kids.",
}

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <NewArrivalsHero />
        <FeaturedNewArrivals />
        <CategoryHighlights />
        <NewArrivalsGrid />
        <TrendingNow />
      </main>

      <Footer />
    </div>
  )
}
