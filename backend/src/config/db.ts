import mongoose from "mongoose"
import { env } from "./env"

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGODB_URI is required")
  }
  await mongoose.connect(env.mongoUri)
}
