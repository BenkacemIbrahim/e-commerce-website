import type { Request, Response } from "express"
import { z } from "zod"
import { StoreSettings } from "../models/StoreSettings"

const schema = z.object({
  storeName: z.string().min(1),
  storeEmail: z.string().email(),
  notifyNewOrders: z.boolean(),
  notifyLowStock: z.boolean(),
  notifyCustomerMessages: z.boolean()
})

export async function getSettings(req: Request, res: Response) {
  let settings = await StoreSettings.findOne({})
  if (!settings) settings = await StoreSettings.create({})
  res.json(settings)
}

export async function updateSettings(req: Request, res: Response) {
  const body = schema.parse(req.body)
  let settings = await StoreSettings.findOne({})
  if (!settings) settings = await StoreSettings.create(body)
  else {
    settings.set(body)
    await settings.save()
  }
  res.json(settings)
}
