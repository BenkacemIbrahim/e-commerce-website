import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

const saleCategories = [
  {
    id: "1",
    name: "Athletic Wear",
    discount: "Up to 50% Off",
    image: "/athletic-sportswear-collection.jpg",
    itemCount: "250+ items",
  },
  {
    id: "2",
    name: "Footwear",
    discount: "Up to 60% Off",
    image: "/athletic-shoes-collection.jpg",
    itemCount: "180+ items",
  },
  {
    id: "3",
    name: "Accessories",
    discount: "Up to 45% Off",
    image: "/sports-accessories-bags-watches.jpg",
    itemCount: "320+ items",
  },
  {
    id: "4",
    name: "Outdoor Gear",
    discount: "Up to 55% Off",
    image: "/outdoor-hiking-gear.jpg",
    itemCount: "150+ items",
  },
]

export function SaleCategoryGrid() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Shop by Category</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore incredible savings across all departments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {saleCategories.map((category) => (
            <Card
              key={category.id}
              className="group relative overflow-hidden border border-border/50 hover:border-accent/30 hover:shadow-2xl transition-all duration-500 aspect-[4/3]"
            >
              <Link href="/sale" className="block h-full">
                <div className="absolute inset-0">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>

                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="bg-accent text-accent-foreground text-sm font-bold px-4 py-2 rounded-full mb-4 inline-flex w-fit">
                    {category.discount}
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm mb-6">{category.itemCount}</p>
                  <Button
                    variant="secondary"
                    className="w-fit rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    Shop Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
