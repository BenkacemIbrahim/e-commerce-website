import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface ICartItem {
  product: mongoose.Types.ObjectId
  quantity: number
  size?: string
  color?: string
  price: number
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId
  items: ICartItem[]
}

const CartItemSchema = new Schema<ICartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, default: 1 },
    size: String,
    color: String,
    price: { type: Number, required: true }
  },
  { _id: false }
)

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", unique: true, required: true },
    items: { type: [CartItemSchema], default: [] }
  },
  { timestamps: true }
)

export const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema)
