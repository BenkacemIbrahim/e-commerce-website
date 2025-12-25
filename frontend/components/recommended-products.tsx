import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

const recommendedProducts = [
  {
    id: "1",
    name: "Sports Water Bottle",
    brand: "Hydro Flask",
    price: 34.99,
    image: "/stainless-steel-bottle.png",
  },
  {
    id: "2",
    name: "Athletic Socks Pack",
    brand: "Nike",
    price: 24.99,
    image: "/white-athletic-socks.jpg",
  },
  {
    id: "3",
    name: "Gym Towel",
    brand: "Under Armour",
    price: 19.99,
    image: "/black-gym-towel.jpg",
  },
  {
    id: "4",
    name: "Resistance Bands Set",
    brand: "TRX",
    price: 39.99,
    image: "/resistance-bands-exercise.png",
  },
]

export function RecommendedProducts() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-semibold tracking-tight mb-2">You Might Also Like</h2>
        <p className="text-muted-foreground">Complete your order with these popular items</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <div key={product.id} className="group">
            <Link href="/" className="block">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4 bg-secondary/20">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
              <h3 className="font-medium mb-2 leading-tight">{product.name}</h3>
              <p className="font-semibold mb-3">${product.price}</p>
            </Link>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
