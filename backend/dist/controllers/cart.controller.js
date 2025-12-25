"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addItem = addItem;
exports.updateItem = updateItem;
exports.removeItem = removeItem;
const zod_1 = require("zod");
const Cart_1 = require("../models/Cart");
const Product_1 = require("../models/Product");
const itemSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().int().positive().default(1),
    size: zod_1.z.string().optional(),
    color: zod_1.z.string().optional()
});
async function getCart(req, res) {
    const cart = await Cart_1.Cart.findOne({ user: req.user?.id });
    res.json(cart || { user: req.user?.id, items: [] });
}
async function addItem(req, res) {
    const body = itemSchema.parse(req.body);
    const product = await Product_1.Product.findById(body.productId);
    if (!product)
        return res.status(404).json({ message: "Product not found" });
    let cart = await Cart_1.Cart.findOne({ user: req.user?.id });
    if (!cart) {
        cart = await Cart_1.Cart.create({ user: req.user?.id, items: [] });
    }
    const existing = cart.items.find((i) => i.product.toString() === product._id.toString() && i.size === body.size && i.color === body.color);
    if (existing) {
        existing.quantity += body.quantity;
    }
    else {
        cart.items.push({
            product: product._id,
            quantity: body.quantity,
            size: body.size,
            color: body.color,
            price: product.salePrice ?? product.price
        });
    }
    await cart.save();
    res.status(201).json(cart);
}
async function updateItem(req, res) {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await Cart_1.Cart.findOne({ user: req.user?.id });
    if (!cart)
        return res.status(404).json({ message: "Cart not found" });
    const item = cart.items.find((i) => i.product.toString() === productId);
    if (!item)
        return res.status(404).json({ message: "Item not found" });
    item.quantity = Math.max(1, quantity);
    await cart.save();
    res.json(cart);
}
async function removeItem(req, res) {
    const { productId } = req.params;
    const cart = await Cart_1.Cart.findOne({ user: req.user?.id });
    if (!cart)
        return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();
    res.json(cart);
}
