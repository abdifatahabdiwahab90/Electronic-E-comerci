import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    action: String,
    type: String,
  },
  { timestamps: true, versionKey: false },
);

export default mongoose.models.Activity || mongoose.model("Activity", activitySchema);
