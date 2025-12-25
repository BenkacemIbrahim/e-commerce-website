import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IOrderItem {
  product: mongoose.Types.ObjectId
  productName: string
  quantity: number
  price: number
  size?: string
  color?: string
}

export interface IOrder extends Document {
  orderNumber: string
  customer: mongoose.Types.ObjectId
  items: IOrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  shippingAddress: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  createdAt: Date
  updatedAt: Date
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    size: String,
    color: String
  },
  { _id: false }
)

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, unique: true, index: true, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending"
    },
    paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending" },
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String
    }
  },
  { timestamps: true }
)

export const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema)
