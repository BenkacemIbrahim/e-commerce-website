import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const relatedProducts = [
  {
    id: 1,
    name: "Reebok M8030",
    price: 210.0,
    image: "/white-sneakers.png",
    brand: "Reebok",
  },
  {
    id: 2,
    name: "Jordan Lss SV 0N",
    price: 196.5,
    image: "/blue-sneakers.jpg",
    brand: "Jordan",
  },
  {
    id: 3,
    name: "Reebok Classic Leather",
    price: 149.95,
    image: "/black-sneakers.png",
    brand: "Reebok",
  },
]

export function RelatedProducts() {
  return (
    <div className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-semibold">You Might Also Like</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedProducts.map((product) => (
          <Card
            key={product.id}
            className="group cursor-pointer overflow-hidden border-border/40 hover:shadow-lg transition-shadow"
          >
            <CardContent className="p-0">
              <div className="relative aspect-square bg-secondary/30 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 bg-background/90 hover:bg-background backdrop-blur-sm"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">{product.brand}</p>
                <h3 className="font-medium mb-3 text-lg">{product.name}</h3>
                <p className="font-serif text-xl font-semibold">${product.price.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
