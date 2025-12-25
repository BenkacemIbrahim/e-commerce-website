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
    name: "Air Max 90 Toggle",
    brand: "Nike",
    price: 79.99,
    image: "/kids-colorful-sneakers.jpg",
    rating: 4.9,
    reviewCount: 187,
    badge: "Best Seller",
  },
  {
    id: "2",
    name: "Classic Velcro",
    brand: "Vans",
    price: 45.0,
    image: "/kids-velcro-sneakers.jpg",
    rating: 4.8,
    reviewCount: 156,
  },
  {
    id: "3",
    name: "FuelCore Coast v6",
    brand: "New Balance",
    price: 59.99,
    originalPrice: 74.99,
    image: "/kids-new-balance-running.jpg",
    rating: 4.7,
    reviewCount: 134,
    badge: "Sale",
  },
  {
    id: "4",
    name: "Superstar 360",
    brand: "Adidas",
    price: 65.0,
    image: "/kids-adidas-superstar.jpg",
    rating: 4.8,
    reviewCount: 198,
  },
]

const newArrivals = [
  {
    id: "5",
    name: "Revolution 7",
    brand: "Nike",
    price: 54.99,
    image: "/kids-nike-revolution.jpg",
    rating: 4.7,
    reviewCount: 67,
    badge: "New",
  },
  {
    id: "6",
    name: "Zig Energy",
    brand: "Reebok",
    price: 69.99,
    image: "/kids-reebok-zig.jpg",
    rating: 4.8,
    reviewCount: 54,
    badge: "New",
  },
  {
    id: "7",
    name: "Chuck Taylor Easy-On",
    brand: "Converse",
    price: 49.99,
    image: "/kids-converse-chuck.jpg",
    rating: 4.9,
    reviewCount: 89,
    badge: "New",
  },
  {
    id: "8",
    name: "RS-X Fun",
    brand: "Puma",
    price: 74.99,
    image: "/kids-puma-rsx.jpg",
    rating: 4.6,
    reviewCount: 72,
    badge: "New",
  },
]

const categories = [
  { id: "1", name: "Toddler (0-4)", image: "/kids-toddler-shoes.jpg", productCount: 89 },
  { id: "2", name: "Little Kids (4-8)", image: "/kids-little-shoes.jpg", productCount: 167 },
  { id: "3", name: "Big Kids (8-12)", image: "/kids-big-shoes.jpg", productCount: 234 },
  { id: "4", name: "Sports", image: "/kids-sports-shoes.jpg", productCount: 145 },
  { id: "5", name: "Sandals", image: "/kids-sandals.jpg", productCount: 78 },
]

const promos = [
  {
    id: "1",
    title: "Back to School",
    description: "Durable styles for active kids",
    image: "/kids-back-to-school.jpg",
    link: "#",
    buttonText: "Shop School Styles",
  },
  {
    id: "2",
    title: "Growing Feet Program",
    description: "Get the perfect fit every time",
    image: "/kids-growing-feet.jpg",
    link: "#",
    buttonText: "Learn More",
  },
]

export default function KidsPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <CategoryHero
        title="Kids' Collection"
        description="Fun, colorful, and comfortable footwear designed for growing feet and active adventures"
        imageUrl="/kids-collection-hero.jpg"
        ctaText="Shop Kids'"
      />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <SectionHeader title="Top Products" description="Parent favorites and kid-approved styles" viewAllLink="#" />
          <ProductGrid products={topProducts} />
        </section>

        <section className="mb-20">
          <SectionHeader title="Shop by Age" description="Find the right fit for every stage" />
          <CategoryShowcase categories={categories} />
        </section>

        <section className="mb-20">
          <SectionHeader title="New Arrivals" description="Latest styles for little feet" viewAllLink="#" />
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
