"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metrics = metrics;
const Order_1 = require("../models/Order");
const Product_1 = require("../models/Product");
const User_1 = require("../models/User");
async function metrics(req, res) {
    const [orders, products, customers] = await Promise.all([
        Order_1.Order.find({}),
        Product_1.Product.find({}),
        User_1.User.countDocuments({ role: "user" })
    ]);
    const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((sum, o) => sum + o.total, 0);
    const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;
    const totalProductsSold = orders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);
    const lowStockProductsCount = products.filter((p) => p.stock < 20).length;
    res.json({
        totalRevenue,
        averageOrderValue,
        totalOrders: orders.length,
        totalProductsSold,
        totalProducts: products.length,
        totalCustomers: customers,
        lowStockProductsCount
    });
}
