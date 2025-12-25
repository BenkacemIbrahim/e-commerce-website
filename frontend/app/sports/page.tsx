import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CategoryHero } from "@/components/category-hero"
import { SectionHeader } from "@/components/section-header"
import { ProductGrid } from "@/components/product-grid"
import { CategoryShowcase } from "@/components/category-showcase"
import { PromoGrid } from "@/components/promo-grid"

const topProducts = [
  {
    id: "1",
    name: "Metcon 9",
    brand: "Nike",
    price: 149.99,
    image: "/training-shoes-black.jpg",
    rating: 4.9,
    reviewCount: 312,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Gel-Nimbus 25",
    brand: "Asics",
    price: 169.99,
    image: "/asics-gel-nimbus.jpg",
    rating: 4.8,
    reviewCount: 287,
  },
  {
    id: "3",
    name: "Court Vision",
    brand: "Nike",
    price: 89.99,
    originalPrice: 119.99,
    image: "/nike-court-vision.jpg",
    rating: 4.7,
    reviewCount: 234,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Wave Rider 27",
    brand: "Mizuno",
    price: 139.99,
    image: "/mizuno-wave-rider.jpg",
    rating: 4.8,
    reviewCount: 198,
  },
]

const newArrivals = [
  {
    id: "5",
    name: "Speedcross 6",
    brand: "Salomon",
    price: 149.99,
    image: "/salomon-speedcross.jpg",
    rating: 4.9,
    reviewCount: 89,
    badge: "New",
  },
  {
    id: "6",
    name: "CloudMonster",
    brand: "On Running",
    price: 179.99,
    image: "/on-cloudmonster.jpg",
    rating: 4.8,
    reviewCount: 76,
    badge: "New",
  },
  {
    id: "7",
    name: "FuelCell SuperComp Elite v4",
    brand: "New Balance",
    price: 249.99,
    image: "/newbalance-fuelcell.jpg",
    rating: 4.9,
    reviewCount: 124,
    badge: "New",
  },
  {
    id: "8",
    name: "Hoka Mach 5",
    brand: "Hoka",
    price: 159.99,
    image: "/hoka-mach.jpg",
    rating: 4.8,
    reviewCount: 167,
    badge: "New",
  },
]

const categories = [
  { id: "1", name: "Running", image: "/sports-running-shoes.jpg", productCount: 298 },
  { id: "2", name: "Training", image: "/sports-training-shoes.jpg", productCount: 187 },
  { id: "3", name: "Basketball", image: "/sports-basketball-shoes.jpg", productCount: 156 },
  { id: "4", name: "Soccer", image: "/sports-soccer-cleats.jpg", productCount: 134 },
  { id: "5", name: "Trail", image: "/sports-trail-shoes.jpg", productCount: 112 },
]

const promos = [
  {
    id: "1",
    title: "Marathon Ready",
    description: "Elite performance for race day",
    image: "/sports-marathon-ready.jpg",
    link: "#",
    buttonText: "Shop Racing",
  },
  {
    id: "2",
    title: "Cross-Training Collection",
    description: "Versatile shoes for any workout",
    image: "/sports-cross-training.jpg",
    link: "#",
    buttonText: "Explore Training",
  },
]

export default function SportsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <CategoryHero
        title="Sports Collection"
        description="Elite performance footwear engineered for athletes. Push your limits with cutting-edge technology"
        imageUrl="/sports-collection-hero.jpg"
        ctaText="Shop Sports"
      />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <SectionHeader title="Top Products" description="Trusted by athletes worldwide" viewAllLink="#" />
          <ProductGrid products={topProducts} />
        </section>

        <section className="mb-20">
          <SectionHeader title="Shop by Sport" description="Specialized footwear for your discipline" />
          <CategoryShowcase categories={categories} />
        </section>

        <section className="mb-20">
          <SectionHeader
            title="New Arrivals"
            description="Latest innovations in athletic performance"
            viewAllLink="#"
          />
          <ProductGrid products={newArrivals} />
        </section>

        <section>
          <PromoGrid promos={promos} />
        </section>
      </main>

      <Footer />
    </div>
  )
}
