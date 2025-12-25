import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  image?: string
  parent?: mongoose.Types.ObjectId
  status: "active" | "inactive"
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, index: true, required: true },
    description: String,
    image: String,
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    status: { type: String, enum: ["active", "inactive"], default: "active" }
  },
  { timestamps: true }
)

export const Category: Model<ICategory> =
  mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema)
