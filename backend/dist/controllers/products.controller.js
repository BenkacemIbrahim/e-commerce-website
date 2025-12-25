"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.remove = remove;
exports.addReview = addReview;
const zod_1 = require("zod");
const Product_1 = require("../models/Product");
const Review_1 = require("../models/Review");
const createSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    brand: zod_1.z.string().min(1),
    category: zod_1.z.string().min(1),
    price: zod_1.z.number().nonnegative(),
    salePrice: zod_1.z.number().optional(),
    stock: zod_1.z.number().int().nonnegative(),
    description: zod_1.z.string().optional(),
    sizes: zod_1.z.array(zod_1.z.string()).optional().default([]),
    colors: zod_1.z.array(zod_1.z.string()).optional().default([]),
    images: zod_1.z.array(zod_1.z.string()).optional().default([]),
    featured: zod_1.z.boolean().optional().default(false),
    status: zod_1.z.enum(["active", "draft", "archived"]).optional().default("active"),
    tags: zod_1.z.array(zod_1.z.string()).optional().default([])
});
async function list(req, res) {
    const { q, category, brand, status, tag, featured, page = "1", limit = "20" } = req.query;
    const filter = {};
    if (q)
        filter.$or = [{ name: new RegExp(q, "i") }, { brand: new RegExp(q, "i") }];
    if (category)
        filter.category = category;
    if (brand)
        filter.brand = brand;
    if (status)
        filter.status = status;
    if (tag)
        filter.tags = tag;
    if (featured)
        filter.featured = featured === "true";
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const [items, total] = await Promise.all([
        Product_1.Product.find(filter).sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(limitNum),
        Product_1.Product.countDocuments(filter)
    ]);
    res.json({ items, total, page: pageNum, pages: Math.ceil(total / limitNum) });
}
async function getById(req, res) {
    const { id } = req.params;
    const product = await Product_1.Product.findById(id);
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json(product);
}
async function create(req, res) {
    const body = createSchema.parse(req.body);
    const slug = body.name.toLowerCase().replace(/\s+/g, "-");
    const product = await Product_1.Product.create({ ...body, slug });
    res.status(201).json(product);
}
async function update(req, res) {
    const { id } = req.params;
    const body = createSchema.partial().parse(req.body);
    const updateData = { ...body };
    if (body.name)
        updateData.slug = body.name.toLowerCase().replace(/\s+/g, "-");
    const product = await Product_1.Product.findByIdAndUpdate(id, updateData, { new: true });
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json(product);
}
async function remove(req, res) {
    const { id } = req.params;
    const product = await Product_1.Product.findByIdAndDelete(id);
    if (!product)
        return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
}
const reviewSchema = zod_1.z.object({
    rating: zod_1.z.number().min(1).max(5),
    title: zod_1.z.string().optional(),
    content: zod_1.z.string().optional()
});
async function addReview(req, res) {
    const { id } = req.params;
    const body = reviewSchema.parse(req.body);
    const review = await Review_1.Review.create({ product: id, user: req.user?.id, rating: body.rating, title: body.title, content: body.content });
    const stats = await Review_1.Review.aggregate([
        { $match: { product: review.product } },
        { $group: { _id: "$product", avgRating: { $avg: "$rating" }, reviewCount: { $sum: 1 } } }
    ]);
    const s = stats[0];
    if (s) {
        await Product_1.Product.findByIdAndUpdate(id, { avgRating: s.avgRating, reviewCount: s.reviewCount });
    }
    res.status(201).json(review);
}
