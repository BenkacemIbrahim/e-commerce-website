import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { FeaturedCategories } from "@/components/featured-categories"
import { TrendingNow } from "@/components/trending-now"
import { BestSellers } from "@/components/best-sellers"
import { PromoBanner } from "@/components/promo-banner"
import { Newsletter } from "@/components/newsletter"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <main>
        <FeaturedCategories />
        <TrendingNow />
        <BestSellers />
        <PromoBanner />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
