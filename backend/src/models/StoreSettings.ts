import mongoose, { Schema, type Document, type Model } from "mongoose"

export interface IStoreSettings extends Document {
  storeName: string
  storeEmail: string
  notifyNewOrders: boolean
  notifyLowStock: boolean
  notifyCustomerMessages: boolean
}

const StoreSettingsSchema = new Schema<IStoreSettings>(
  {
    storeName: { type: String, default: "BR. Premium Sneakers" },
    storeEmail: { type: String, default: "contact@br.com" },
    notifyNewOrders: { type: Boolean, default: true },
    notifyLowStock: { type: Boolean, default: true },
    notifyCustomerMessages: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const StoreSettings: Model<IStoreSettings> =
  mongoose.models.StoreSettings || mongoose.model<IStoreSettings>("StoreSettings", StoreSettingsSchema)
