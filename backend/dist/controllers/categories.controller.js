"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.create = create;
exports.update = update;
exports.remove = remove;
const zod_1 = require("zod");
const Category_1 = require("../models/Category");
const schema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    image: zod_1.z.string().optional(),
    parent: zod_1.z.string().optional(),
    status: zod_1.z.enum(["active", "inactive"]).optional().default("active")
});
async function list(req, res) {
    const categories = await Category_1.Category.find({}).sort({ name: 1 });
    res.json(categories);
}
async function create(req, res) {
    const body = schema.parse(req.body);
    const exists = await Category_1.Category.findOne({ slug: body.slug });
    if (exists)
        return res.status(409).json({ message: "Slug already exists" });
    const category = await Category_1.Category.create(body);
    res.status(201).json(category);
}
async function update(req, res) {
    const { id } = req.params;
    const body = schema.partial().parse(req.body);
    const category = await Category_1.Category.findByIdAndUpdate(id, body, { new: true });
    if (!category)
        return res.status(404).json({ message: "Not found" });
    res.json(category);
}
async function remove(req, res) {
    const { id } = req.params;
    const category = await Category_1.Category.findByIdAndDelete(id);
    if (!category)
        return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
}
