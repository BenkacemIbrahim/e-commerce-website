import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface Category {
  id: string
  name: string
  image: string
  productCount: number
}

interface CategoryShowcaseProps {
  categories: Category[]
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href="#"
          className="group relative aspect-square overflow-hidden rounded-xl bg-neutral-100 hover:shadow-2xl transition-all duration-500 border border-border/30 hover:border-primary/30"
        >
          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
            <h3 className="font-semibold text-lg mb-1.5 group-hover:text-accent transition-colors">{category.name}</h3>
            <p className="text-sm text-white/90 flex items-center gap-1.5 font-medium">
              {category.productCount} products
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
