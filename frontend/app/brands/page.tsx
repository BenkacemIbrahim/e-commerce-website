import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BrandsHero } from "@/components/brands-hero"
import { AlphabetNav } from "@/components/alphabet-nav"
import { BrandsGrid } from "@/components/brands-grid"

const brands = [
  // A
  { name: "Adidas", logo: "/adidas-logo.png", category: "Athletic", letter: "A" },
  { name: "ASICS", logo: "/asics-logo.jpg", category: "Running", letter: "A" },
  { name: "Arc'teryx", logo: "/arcteryx-logo.jpg", category: "Outdoor", letter: "A" },
  { name: "AllSaints", logo: "/allsaints-logo.jpg", category: "Fashion", letter: "A" },

  // B
  { name: "Balenciaga", logo: "/stylized-geometric-logo.png", category: "Luxury", letter: "B" },
  { name: "Brooks", logo: "/brooks-running-logo.jpg", category: "Running", letter: "B" },
  { name: "Burberry", logo: "/burberry-logo.jpg", category: "Luxury", letter: "B" },

  // C
  { name: "Calvin Klein", logo: "/calvin-klein-logo.jpg", category: "Fashion", letter: "C" },
  { name: "Converse", logo: "/converse-logo.jpg", category: "Footwear", letter: "C" },
  { name: "Canada Goose", logo: "/canada-goose-logo.jpg", category: "Outerwear", letter: "C" },
  { name: "Champion", logo: "/champion-logo.jpg", category: "Athletic", letter: "C" },

  // D
  { name: "Diesel", logo: "/diesel-logo.jpg", category: "Denim", letter: "D" },
  { name: "Dior", logo: "/dior-logo.jpg", category: "Luxury", letter: "D" },

  // E
  { name: "Everlane", logo: "/everlane-logo.jpg", category: "Sustainable", letter: "E" },

  // F
  { name: "Fendi", logo: "/fendi-logo.jpg", category: "Luxury", letter: "F" },
  { name: "Fila", logo: "/fila-logo.jpg", category: "Athletic", letter: "F" },

  // G
  { name: "Gucci", logo: "/stylized-interlocking-gs.png", category: "Luxury", letter: "G" },
  { name: "GAP", logo: "/gap-logo.jpg", category: "Casual", letter: "G" },

  // H
  { name: "Hugo Boss", logo: "/hugo-boss-logo.jpg", category: "Fashion", letter: "H" },
  { name: "Herschel", logo: "/herschel-logo.jpg", category: "Accessories", letter: "H" },

  // J
  { name: "Jordan", logo: "/jordan-logo.jpg", category: "Athletic", letter: "J" },
  { name: "J.Crew", logo: "/jcrew-logo.jpg", category: "Fashion", letter: "J" },

  // K
  { name: "Kappa", logo: "/kappa-logo.jpg", category: "Athletic", letter: "K" },

  // L
  { name: "Lacoste", logo: "/lacoste-logo.jpg", category: "Fashion", letter: "L" },
  { name: "Levi's", logo: "/levis-logo.jpg", category: "Denim", letter: "L" },
  { name: "Lululemon", logo: "/lululemon-logo.jpg", category: "Athletic", letter: "L" },
  { name: "Louis Vuitton", logo: "/louis-vuitton-logo.jpg", category: "Luxury", letter: "L" },

  // M
  { name: "Moncler", logo: "/moncler-logo.jpg", category: "Luxury", letter: "M" },
  { name: "Michael Kors", logo: "/michael-kors-logo.jpg", category: "Fashion", letter: "M" },

  // N
  { name: "Nike", logo: "/nike-logo.jpg", category: "Athletic", letter: "N" },
  { name: "New Balance", logo: "/new-balance-logo.jpg", category: "Athletic", letter: "N" },
  { name: "The North Face", logo: "/north-face-logo.jpg", category: "Outdoor", letter: "N" },

  // O
  { name: "Off-White", logo: "/off-white-logo.jpg", category: "Streetwear", letter: "O" },

  // P
  { name: "Prada", logo: "/prada-logo.jpg", category: "Luxury", letter: "P" },
  { name: "Puma", logo: "/puma-logo.jpg", category: "Athletic", letter: "P" },
  { name: "Polo Ralph Lauren", logo: "/polo-ralph-lauren-logo.jpg", category: "Fashion", letter: "P" },
  { name: "Patagonia", logo: "/patagonia-logo.jpg", category: "Outdoor", letter: "P" },

  // R
  { name: "Reebok", logo: "/reebok-logo.jpg", category: "Athletic", letter: "R" },
  { name: "Ray-Ban", logo: "/rayban-logo.jpg", category: "Eyewear", letter: "R" },

  // S
  { name: "Supreme", logo: "/supreme-logo.jpg", category: "Streetwear", letter: "S" },
  { name: "Stone Island", logo: "/stone-island-logo.jpg", category: "Fashion", letter: "S" },
  { name: "Salomon", logo: "/salomon-logo.jpg", category: "Outdoor", letter: "S" },

  // T
  { name: "Tommy Hilfiger", logo: "/tommy-hilfiger-logo.jpg", category: "Fashion", letter: "T" },
  { name: "Timberland", logo: "/timberland-logo.jpg", category: "Footwear", letter: "T" },

  // U
  { name: "Under Armour", logo: "/under-armour-logo.jpg", category: "Athletic", letter: "U" },
  { name: "Uniqlo", logo: "/uniqlo-logo.jpg", category: "Casual", letter: "U" },

  // V
  { name: "Versace", logo: "/versace-logo.jpg", category: "Luxury", letter: "V" },
  { name: "Vans", logo: "/vans-logo.jpg", category: "Footwear", letter: "V" },

  // Y
  { name: "Y-3", logo: "/y3-logo.jpg", category: "Designer", letter: "Y" },

  // Z
  { name: "Zara", logo: "/zara-logo.jpg", category: "Fast Fashion", letter: "Z" },
]

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* PromoBanner and Header should come from layout or be at top level */}
      <Header />

      <BrandsHero />

      <main className="container mx-auto px-4 py-12 lg:py-16">
        <AlphabetNav brands={brands} />
        <BrandsGrid brands={brands} />
      </main>

      <Footer />
    </div>
  )
}
