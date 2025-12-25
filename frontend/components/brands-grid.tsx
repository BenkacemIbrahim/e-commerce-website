"use client"

import Image from "next/image"
import Link from "next/link"

interface Brand {
  name: string
  logo: string
  category: string
  letter: string
}

interface BrandsGridProps {
  brands: Brand[]
}

export function BrandsGrid({ brands }: BrandsGridProps) {
  // Group brands by letter
  const brandsByLetter = brands.reduce(
    (acc, brand) => {
      if (!acc[brand.letter]) {
        acc[brand.letter] = []
      }
      acc[brand.letter].push(brand)
      return acc
    },
    {} as Record<string, Brand[]>,
  )

  // Sort letters
  const sortedLetters = Object.keys(brandsByLetter).sort()

  return (
    <div className="space-y-16">
      {sortedLetters.map((letter) => (
        <section key={letter} id={`brand-section-${letter}`} className="scroll-mt-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <span className="font-serif text-3xl font-light text-primary">{letter}</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-light text-foreground">{letter}</h2>
              <p className="text-sm text-muted-foreground">
                {brandsByLetter[letter].length} {brandsByLetter[letter].length === 1 ? "brand" : "brands"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {brandsByLetter[letter].map((brand) => (
              <Link
                key={brand.name}
                href="#"
                className="group relative flex flex-col items-center justify-center rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md"
              >
                <div className="relative h-20 w-full">
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={`${brand.name} logo`}
                    fill
                    className="object-contain object-center transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-medium text-sm text-foreground">{brand.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{brand.category}</p>
                </div>

                {/* Hover indicator */}
                <div className="absolute inset-0 rounded-lg border-2 border-primary opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
