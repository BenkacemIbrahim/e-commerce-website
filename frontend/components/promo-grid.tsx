import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Promo {
  id: string
  title: string
  description: string
  image: string
  link: string
  buttonText: string
}

interface PromoGridProps {
  promos: Promo[]
}

export function PromoGrid({ promos }: PromoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {promos.map((promo) => (
        <Link
          key={promo.id}
          href={promo.link}
          className="group relative h-[450px] overflow-hidden rounded-2xl bg-neutral-100 hover:shadow-2xl transition-all duration-500 border border-border/30"
        >
          <img
            src={promo.image || "/placeholder.svg"}
            alt={promo.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10 text-white">
            <h3 className="font-serif text-4xl font-bold mb-3 tracking-tight">{promo.title}</h3>
            <p className="text-lg text-white/95 mb-6 leading-relaxed">{promo.description}</p>
            <Button
              variant="secondary"
              size="lg"
              className="group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-xl px-8"
            >
              {promo.buttonText}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  )
}
