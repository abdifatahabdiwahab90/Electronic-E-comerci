import Basket from "../models/basketSchema.js";

export const getBasket = async (req, res, next) => { try { const basket = await Basket.findOne({ email: req.user.email }); res.json(basket || { cart: [], wishlist: [] }); } catch (error) { next(error); } };
export const saveBasket = async (req, res, next) => { try { const basket = await Basket.findOneAndUpdate({ email: req.user.email }, { $set: { cart: req.body.cart || [], wishlist: req.body.wishlist || [] } }, { upsert: true, new: true }); res.json(basket); } catch (error) { next(error); } };
