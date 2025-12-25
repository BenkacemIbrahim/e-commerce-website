import { Button } from "@/components/ui/button"
import { ChevronRight, Tag } from "lucide-react"

export function SaleBanner() {
  return (
    <section className="py-20 bg-gradient-to-br from-accent/20 via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-accent/30 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-accent/40">
            <Tag className="h-4 w-4 text-accent-foreground" />
            <span className="text-sm font-semibold text-accent-foreground">Exclusive Offer</span>
          </div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Get an Extra 15% Off
          </h2>

          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
            Use code <span className="font-bold text-accent-foreground bg-accent/20 px-3 py-1 rounded">EXTRA15</span> at
            checkout for additional savings on sale items
          </p>

          <Button size="lg" className="px-8 py-6 text-base font-semibold rounded-full shadow-xl hover:shadow-2xl">
            Shop Now and Save
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="text-sm text-muted-foreground mt-6">
            * Valid on select sale items. Terms and conditions apply.
          </p>
        </div>
      </div>
    </section>
  )
}
