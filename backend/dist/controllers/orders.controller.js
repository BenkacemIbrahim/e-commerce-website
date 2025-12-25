"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.listMy = listMy;
exports.create = create;
exports.updateStatus = updateStatus;
const zod_1 = require("zod");
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const createSchema = zod_1.z.object({
    items: zod_1.z
        .array(zod_1.z.object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive(),
        size: zod_1.z.string().optional(),
        color: zod_1.z.string().optional()
    }))
        .min(1),
    shippingAddress: zod_1.z.object({
        street: zod_1.z.string().min(1),
        city: zod_1.z.string().min(1),
        state: zod_1.z.string().min(1),
        zip: zod_1.z.string().min(1),
        country: zod_1.z.string().min(1)
    })
});
async function list(req, res) {
    const { status, page = "1", limit = "20" } = req.query;
    const filter = {};
    if (status)
        filter.status = status;
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [items, total] = await Promise.all([
        Order_1.Order.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
        Order_1.Order.countDocuments(filter)
    ]);
    res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
}
async function listMy(req, res) {
    const orders = await Order_1.Order.find({ customer: req.user?.id }).sort({ createdAt: -1 });
    res.json(orders);
}
async function create(req, res) {
    const body = createSchema.parse(req.body);
    const products = await Product_1.Product.find({ _id: { $in: body.items.map((i) => i.productId) } });
    const items = body.items.map((i) => {
        const p = products.find((pp) => pp.id === i.productId);
        return {
            product: p._id,
            productName: p.name,
            quantity: i.quantity,
            price: p.salePrice ?? p.price,
            size: i.size,
            color: i.color
        };
    });
    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderNumber = `ORD-${new Date().getFullYear()}-${Math.random().toString().slice(2, 6)}`;
    const order = await Order_1.Order.create({
        orderNumber,
        customer: req.user?.id,
        items,
        total,
        status: "pending",
        paymentStatus: "pending",
        shippingAddress: body.shippingAddress
    });
    res.status(201).json(order);
}
async function updateStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order_1.Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order)
        return res.status(404).json({ message: "Not found" });
    res.json(order);
}
