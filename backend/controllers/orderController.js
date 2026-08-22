import Order from "../models/orderSchema.js";
import { logActivity } from "../services/activityService.js";
import { decreaseProductStock, getProductsByIds } from "../services/productService.js";

export const listOrders = async (_, res, next) => { try { res.json(await Order.find().sort({ createdAt: -1 })); } catch (error) { next(error); } };
export const listMyOrders = async (req, res, next) => { try { res.json(await Order.find({ customerEmail: req.user.email }).sort({ createdAt: -1 })); } catch (error) { next(error); } };

export const createOrder = async (req, res, next) => {
  try {
    const { items = [] } = req.body;
    const products = await getProductsByIds(items.map((item) => item.id));
    for (const item of items) {
      const product = products.find((entry) => entry.id === item.id);
      if (!product || product.stock < item.quantity) return res.status(400).json({ message: `Insufficient stock for ${item.name}.` });
    }
    for (const item of items) await decreaseProductStock(item.id, item.quantity);
    const order = await Order.create({ ...req.body, id: `ORD-${Date.now()}`, customerEmail: req.user.email, status: "pending", statusHistory: [{ status: "pending", at: new Date().toISOString() }] });
    await logActivity(`New order: ${order.id} - ${order.customerName}`, "order");
    res.status(201).json(order);
  } catch (error) { next(error); }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate({ id: req.params.id }, { $set: { status: req.body.status }, $push: { statusHistory: { status: req.body.status, at: new Date().toISOString() } } }, { new: true });
    if (!order) return res.status(404).json({ message: "Order not found." });
    await logActivity(`Order ${order.id}: ${order.status}`, "order");
    res.json(order);
  } catch (error) { next(error); }
};
