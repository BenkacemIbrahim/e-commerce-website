import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IWishlist extends Document {
  user: mongoose.Types.ObjectId
  products: mongoose.Types.ObjectId[]
}

const WishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    products: { type: [Schema.Types.ObjectId], ref: "Product", default: [] }
  },
  { timestamps: true }
)

export const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model<IWishlist>("Wishlist", WishlistSchema)
