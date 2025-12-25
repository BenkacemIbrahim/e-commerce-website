"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCustomers = listCustomers;
const User_1 = require("../models/User");
const Order_1 = require("../models/Order");
async function listCustomers(req, res) {
    const users = await User_1.User.find({ role: "user" }).sort({ createdAt: -1 });
    const orders = await Order_1.Order.find({});
    const items = users.map((u) => {
        const userOrders = orders.filter((o) => o.customer.toString() === u._id.toString());
        const totalOrders = userOrders.length;
        const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
        const lastOrderDate = userOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0]?.createdAt;
        return {
            id: u.id,
            name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.email,
            email: u.email,
            phone: u.phone,
            totalOrders,
            totalSpent,
            createdAt: u.createdAt,
            lastOrderDate
        };
    });
    res.json(items);
}
