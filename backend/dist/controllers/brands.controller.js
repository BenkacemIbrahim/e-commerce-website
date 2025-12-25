"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.create = create;
exports.update = update;
exports.remove = remove;
const zod_1 = require("zod");
const Brand_1 = require("../models/Brand");
const schema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    slug: zod_1.z.string().min(1),
    logo: zod_1.z.string().optional(),
    category: zod_1.z.string().optional(),
    letter: zod_1.z.string().optional()
});
async function list(req, res) {
    const { letter } = req.query;
    const filter = {};
    if (letter)
        filter.letter = letter.toUpperCase();
    const brands = await Brand_1.Brand.find(filter).sort({ name: 1 });
    res.json(brands);
}
async function create(req, res) {
    const body = schema.parse(req.body);
    const exists = await Brand_1.Brand.findOne({ slug: body.slug });
    if (exists)
        return res.status(409).json({ message: "Slug already exists" });
    const brand = await Brand_1.Brand.create({ ...body, letter: body.letter || body.name[0].toUpperCase() });
    res.status(201).json(brand);
}
async function update(req, res) {
    const { id } = req.params;
    const body = schema.partial().parse(req.body);
    const brand = await Brand_1.Brand.findByIdAndUpdate(id, body, { new: true });
    if (!brand)
        return res.status(404).json({ message: "Not found" });
    res.json(brand);
}
async function remove(req, res) {
    const { id } = req.params;
    const brand = await Brand_1.Brand.findByIdAndDelete(id);
    if (!brand)
        return res.status(404).json({ message: "Not found" });
    res.json({ success: true });
}
