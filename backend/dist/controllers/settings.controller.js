"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
exports.updateSettings = updateSettings;
const zod_1 = require("zod");
const StoreSettings_1 = require("../models/StoreSettings");
const schema = zod_1.z.object({
    storeName: zod_1.z.string().min(1),
    storeEmail: zod_1.z.string().email(),
    notifyNewOrders: zod_1.z.boolean(),
    notifyLowStock: zod_1.z.boolean(),
    notifyCustomerMessages: zod_1.z.boolean()
});
async function getSettings(req, res) {
    let settings = await StoreSettings_1.StoreSettings.findOne({});
    if (!settings)
        settings = await StoreSettings_1.StoreSettings.create({});
    res.json(settings);
}
async function updateSettings(req, res) {
    const body = schema.parse(req.body);
    let settings = await StoreSettings_1.StoreSettings.findOne({});
    if (!settings)
        settings = await StoreSettings_1.StoreSettings.create(body);
    else {
        settings.set(body);
        await settings.save();
    }
    res.json(settings);
}
