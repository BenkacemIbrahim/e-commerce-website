export function BrandsHero() {
  return (
    <section className="relative bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-5xl font-light tracking-tight text-foreground lg:text-7xl text-balance">
            Our Brands
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed text-pretty">
            Discover our carefully curated collection of premium brands. From timeless luxury to cutting-edge athletic
            wear, we partner with the world's finest to bring you exceptional quality and style.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>60+ Premium Brands</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Authentic Products</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Worldwide Partners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
