import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    customerName: String,
    customerEmail: String,
    items: [mongoose.Schema.Types.Mixed],
    total: Number,
    paymentMethod: String,
    shippingAddress: String,
    status: { type: String, default: "pending" },
    statusHistory: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
