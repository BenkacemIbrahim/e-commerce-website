import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IRefreshToken extends Document {
  user: mongoose.Types.ObjectId
  token: string
  expiresAt: Date
}

const RefreshTokenSchema = new Schema<IRefreshToken>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    token: { type: String, index: true, unique: true, required: true },
    expiresAt: { type: Date, required: true }
  },
  { timestamps: true }
)

export const RefreshToken: Model<IRefreshToken> =
  mongoose.models.RefreshToken || mongoose.model<IRefreshToken>("RefreshToken", RefreshTokenSchema)
