"use client"

import { Search, ShoppingCart, Heart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="bg-foreground text-background py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs tracking-wide">New Arrivals: Spring Collection Now Available — Shop Now</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-2xl font-serif font-semibold tracking-tight">
              BR.
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              <Link href="/women" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Women
              </Link>
              <Link href="/men" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Men
              </Link>
              <Link href="/kids" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Kids
              </Link>
              <Link href="/sports" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Sports
              </Link>
              <Link href="/brands" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                Brands
              </Link>
              <Link href="/new" className="text-sm tracking-wide hover:text-muted-foreground transition-colors">
                New
              </Link>
              <Link
                href="/sale"
                className="text-sm tracking-wide text-accent-foreground hover:opacity-80 transition-opacity"
              >
                Sale
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-foreground text-background text-[10px] font-medium flex items-center justify-center">
                  2
                </span>
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border/40 shadow-lg animate-in slide-in-from-top-2 duration-300">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search for products, brands, categories..."
                    className="pl-12 pr-4 h-14 text-base bg-secondary/30 border-border/50 focus:bg-background transition-colors rounded-lg"
                    autoFocus
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="h-14 w-14">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Popular Searches</h3>
                  <ul className="space-y-1">
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Running Shoes</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Winter Jackets</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Yoga Pants</button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Categories</h3>
                  <ul className="space-y-1">
                    <li>
                      <Link href="/women" className="text-sm hover:text-muted-foreground transition-colors">
                        Women
                      </Link>
                    </li>
                    <li>
                      <Link href="/men" className="text-sm hover:text-muted-foreground transition-colors">
                        Men
                      </Link>
                    </li>
                    <li>
                      <Link href="/sports" className="text-sm hover:text-muted-foreground transition-colors">
                        Sports
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Top Brands</h3>
                  <ul className="space-y-1">
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Nike</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Adidas</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Puma</button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-2 text-muted-foreground">Trending</h3>
                  <ul className="space-y-1">
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">New Arrivals</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Sale Items</button>
                    </li>
                    <li>
                      <button className="text-sm hover:text-muted-foreground transition-colors">Best Sellers</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
