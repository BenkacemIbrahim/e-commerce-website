import mongoose, { Schema, type Document, type Model } from "mongoose"

export type UserRole = "user" | "admin"

export interface IUser extends Document {
  email: string
  passwordHash: string
  firstName?: string
  lastName?: string
  role: UserRole
  phone?: string
  addresses: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }[]
  createdAt: Date
  updatedAt: Date
}

const AddressSchema = new Schema(
  {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  { _id: false }
)

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, unique: true, index: true, required: true },
    passwordHash: { type: String, required: true },
    firstName: String,
    lastName: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: String,
    addresses: { type: [AddressSchema], default: [] }
  },
  { timestamps: true }
)

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)
