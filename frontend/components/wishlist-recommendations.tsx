import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const recommendations = [
  {
    id: "1",
    name: "Trail Running Shoes",
    brand: "Salomon",
    price: 149.99,
    image: "/trail-running-shoes.jpg",
  },
  {
    id: "2",
    name: "Water Resistant Jacket",
    brand: "Patagonia",
    price: 199.0,
    image: "/blue-waterproof-jacket.jpg",
  },
  {
    id: "3",
    name: "Fitness Tracker",
    brand: "Fitbit",
    price: 129.99,
    image: "/black-fitness-tracker.jpg",
  },
  {
    id: "4",
    name: "Cycling Shorts",
    brand: "Pearl Izumi",
    price: 79.99,
    image: "/black-cycling-shorts.jpg",
  },
]

export function WishlistRecommendations() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-semibold tracking-tight mb-2">Based on Your Wishlist</h2>
        <p className="text-muted-foreground">Products we think you'll love</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recommendations.map((product) => (
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
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
