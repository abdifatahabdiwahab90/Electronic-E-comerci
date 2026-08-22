import Activity from "../models/activitySchema.js";

export const logActivity = (action, type) => Activity.create({ action, type });
