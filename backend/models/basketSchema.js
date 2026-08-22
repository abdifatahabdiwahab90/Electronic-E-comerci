import mongoose from "mongoose";

const basketSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    cart: [mongoose.Schema.Types.Mixed],
    wishlist: [mongoose.Schema.Types.Mixed],
  },
  { versionKey: false },
);

export default mongoose.models.Basket || mongoose.model("Basket", basketSchema);
