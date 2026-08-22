import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: String,
    email: String,
    subject: String,
    message: String,
    status: { type: String, default: "new" },
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);
