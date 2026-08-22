import Activity from "../models/activitySchema.js";

export const listActivity = async (_, res, next) => { try { res.json(await Activity.find().sort({ createdAt: -1 }).limit(20)); } catch (error) { next(error); } };
