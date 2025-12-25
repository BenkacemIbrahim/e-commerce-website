import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface SectionHeaderProps {
  title: string
  description?: string
  viewAllLink?: string
  viewAllText?: string
}

export function SectionHeader({ title, description, viewAllLink, viewAllText = "View All" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-12">
      <div>
        <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-balance">{title}</h2>
        {description && <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">{description}</p>}
      </div>

      {viewAllLink && (
        <Button variant="ghost" asChild className="group hover:bg-accent/50 transition-all">
          <Link href={viewAllLink}>
            {viewAllText}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      )}
    </div>
  )
}
