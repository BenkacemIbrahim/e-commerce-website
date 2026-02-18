import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 mt-24 bg-secondary/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-16 border-b border-border/40">
          <div>
            <h3 className="font-serif text-3xl font-semibold mb-4">Stay in the Loop</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style inspiration.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex gap-3 max-w-md">
              <Input type="email" placeholder="Enter your email" className="bg-background border-border/40" />
              <Button size="lg" className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wide text-sm">Company</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/stores" className="text-muted-foreground hover:text-foreground transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-foreground transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wide text-sm">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wide text-sm">Contact</h3>
            <ul className="space-y-4">
              <li className="text-muted-foreground">+44 (555) 01-12-12-32</li>
              <li>
                <Link
                  href="mailto:support@br.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  support@br.com
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-6 uppercase tracking-wide text-sm">Follow us</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="text-2xl font-serif font-semibold">
            BR.
          </Link>
          <p className="text-sm text-muted-foreground">© {currentYear} BR. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
