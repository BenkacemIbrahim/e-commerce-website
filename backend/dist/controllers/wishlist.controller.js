"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlist = getWishlist;
exports.addToWishlist = addToWishlist;
exports.removeFromWishlist = removeFromWishlist;
const Wishlist_1 = require("../models/Wishlist");
async function getWishlist(req, res) {
    const wishlist = await Wishlist_1.Wishlist.findOne({ user: req.user?.id });
    res.json(wishlist || { user: req.user?.id, products: [] });
}
async function addToWishlist(req, res) {
    const { productId } = req.body;
    let wishlist = await Wishlist_1.Wishlist.findOne({ user: req.user?.id });
    if (!wishlist) {
        wishlist = await Wishlist_1.Wishlist.create({ user: req.user?.id, products: [] });
    }
    if (!wishlist.products.find((p) => p.toString() === productId)) {
        wishlist.products.push(productId);
        await wishlist.save();
    }
    res.status(201).json(wishlist);
}
async function removeFromWishlist(req, res) {
    const { productId } = req.params;
    const wishlist = await Wishlist_1.Wishlist.findOne({ user: req.user?.id });
    if (!wishlist)
        return res.status(404).json({ message: "Wishlist not found" });
    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
    await wishlist.save();
    res.json(wishlist);
}
