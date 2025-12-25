import bcrypt from "bcryptjs"
import { connectDB } from "../config/db"
import { env } from "../config/env"
import { User } from "../models/User"
import { Category } from "../models/Category"
import { Brand } from "../models/Brand"
import { Product } from "../models/Product"
import { StoreSettings } from "../models/StoreSettings"

async function run() {
  await connectDB()
  const adminEmail = env.adminDefaultEmail || "admin@br.com"
  const adminPassword = env.adminDefaultPassword || "Admin123!"
  const existingAdmin = await User.findOne({ email: adminEmail })
  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 10)
    await User.create({ email: adminEmail, passwordHash, role: "admin", firstName: "Admin", lastName: "User" })
  }

  const categories = [
    { name: "Running", slug: "running", description: "High-performance running shoes", status: "active" },
    { name: "Lifestyle", slug: "lifestyle", description: "Casual and everyday sneakers", status: "active" },
    { name: "Basketball", slug: "basketball", description: "Court-ready basketball shoes", status: "active" },
    { name: "Training", slug: "training", description: "Versatile training footwear", status: "active" }
  ]
  for (const c of categories) {
    if (!(await Category.findOne({ slug: c.slug }))) await Category.create(c as any)
  }

  const brands = [
    { name: "Nike", slug: "nike", category: "Athletic", letter: "N" },
    { name: "Adidas", slug: "adidas", category: "Athletic", letter: "A" },
    { name: "Reebok", slug: "reebok", category: "Athletic", letter: "R" },
    { name: "Puma", slug: "puma", category: "Athletic", letter: "P" }
  ]
  for (const b of brands) {
    if (!(await Brand.findOne({ slug: b.slug }))) await Brand.create(b as any)
  }

  const products = [
    {
      name: "Reebok Zig Kinetica",
      slug: "reebok-zig-kinetica",
      brand: "Reebok",
      price: 120,
      salePrice: 99,
      category: "Running",
      stock: 45,
      images: ["/reebok-zig-kinetica-side.jpg", "/reebok-zig-kinetica-back.jpg"],
      description: "Innovative running shoe with zig energy technology",
      sizes: ["7", "8", "9", "10", "11", "12"],
      colors: ["Black", "White", "Grey"],
      featured: true,
      status: "active"
    },
    {
      name: "Nike Air Max 270",
      slug: "nike-air-max-270",
      brand: "Nike",
      price: 150,
      category: "Lifestyle",
      stock: 32,
      images: ["/blue-sneakers.jpg"],
      description: "Iconic Air Max comfort with modern style",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["Blue", "Black", "White"],
      featured: true,
      status: "active"
    }
  ]
  for (const p of products) {
    if (!(await Product.findOne({ slug: p.slug }))) await Product.create(p as any)
  }

  if (!(await StoreSettings.findOne({}))) await StoreSettings.create({})

  process.exit(0)
}

run().catch(() => process.exit(1))
