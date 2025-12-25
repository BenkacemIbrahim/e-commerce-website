import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IProduct extends Document {
  name: string
  slug: string
  brand: string
  price: number
  salePrice?: number
  category: string
  stock: number
  images: string[]
  description?: string
  sizes: string[]
  colors: string[]
  featured: boolean
  status: "active" | "draft" | "archived"
  avgRating: number
  reviewCount: number
  tags: string[]
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    salePrice: Number,
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    description: String,
    sizes: { type: [String], default: [] },
    colors: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ["active", "draft", "archived"], default: "active" },
    avgRating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    tags: { type: [String], default: [] }
  },
  { timestamps: true }
)

export const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema)
