import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SaleHero } from "@/components/sale-hero"
import { FlashDeals } from "@/components/flash-deals"
import { SaleCategoryGrid } from "@/components/sale-category-grid"
import { SaleProductGrid } from "@/components/sale-product-grid"
import { SaleBanner } from "@/components/sale-banner"

export default function SalePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SaleHero />
      <FlashDeals />
      <SaleCategoryGrid />
      <SaleProductGrid />
      <SaleBanner />
      <Footer />
    </div>
  )
}
