"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const Category_1 = require("../models/Category");
const Brand_1 = require("../models/Brand");
const Product_1 = require("../models/Product");
const StoreSettings_1 = require("../models/StoreSettings");
async function run() {
    await (0, db_1.connectDB)();
    const adminEmail = env_1.env.adminDefaultEmail || "admin@br.com";
    const adminPassword = env_1.env.adminDefaultPassword || "Admin123!";
    const existingAdmin = await User_1.User.findOne({ email: adminEmail });
    if (!existingAdmin) {
        const passwordHash = await bcryptjs_1.default.hash(adminPassword, 10);
        await User_1.User.create({ email: adminEmail, passwordHash, role: "admin", firstName: "Admin", lastName: "User" });
    }
    const categories = [
        { name: "Running", slug: "running", description: "High-performance running shoes", status: "active" },
        { name: "Lifestyle", slug: "lifestyle", description: "Casual and everyday sneakers", status: "active" },
        { name: "Basketball", slug: "basketball", description: "Court-ready basketball shoes", status: "active" },
        { name: "Training", slug: "training", description: "Versatile training footwear", status: "active" }
    ];
    for (const c of categories) {
        if (!(await Category_1.Category.findOne({ slug: c.slug })))
            await Category_1.Category.create(c);
    }
    const brands = [
        { name: "Nike", slug: "nike", category: "Athletic", letter: "N" },
        { name: "Adidas", slug: "adidas", category: "Athletic", letter: "A" },
        { name: "Reebok", slug: "reebok", category: "Athletic", letter: "R" },
        { name: "Puma", slug: "puma", category: "Athletic", letter: "P" }
    ];
    for (const b of brands) {
        if (!(await Brand_1.Brand.findOne({ slug: b.slug })))
            await Brand_1.Brand.create(b);
    }
    const products = [
        {
            name: "Reebok Zig Kinetica",
            slug: "reebok-zig-kinetica",
            brand: "Reebok",
            price: 120,
            salePrice: 99,
            category: "Running",
            stock: 45,
            images: ["/reebok-zig-kinetica-side.jpg", "/reebok-zig-kinetica-back.jpg"],
            description: "Innovative running shoe with zig energy technology",
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["Black", "White", "Grey"],
            featured: true,
            status: "active"
        },
        {
            name: "Nike Air Max 270",
            slug: "nike-air-max-270",
            brand: "Nike",
            price: 150,
            category: "Lifestyle",
            stock: 32,
            images: ["/blue-sneakers.jpg"],
            description: "Iconic Air Max comfort with modern style",
            sizes: ["7", "8", "9", "10", "11"],
            colors: ["Blue", "Black", "White"],
            featured: true,
            status: "active"
        }
    ];
    for (const p of products) {
        if (!(await Product_1.Product.findOne({ slug: p.slug })))
            await Product_1.Product.create(p);
    }
    if (!(await StoreSettings_1.StoreSettings.findOne({})))
        await StoreSettings_1.StoreSettings.create({});
    process.exit(0);
}
run().catch(() => process.exit(1));
