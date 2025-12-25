import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { CartSummary } from "@/components/cart-summary"
import { RecommendedProducts } from "@/components/recommended-products"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 lg:py-12">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Shopping Cart</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-balance">Your Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div>
            <CartSummary />
          </div>
        </div>

        <div className="mt-16">
          <RecommendedProducts />
        </div>
      </main>

      <Footer />
    </div>
  )
}
