import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IBrand extends Document {
  name: string
  slug: string
  logo?: string
  category?: string
  letter?: string
}

const BrandSchema = new Schema<IBrand>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
    logo: String,
    category: String,
    letter: String
  },
  { timestamps: true }
)

export const Brand: Model<IBrand> = mongoose.models.Brand || mongoose.model<IBrand>("Brand", BrandSchema)
