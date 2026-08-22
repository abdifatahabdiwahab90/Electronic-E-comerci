import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret-change-me";
const publicUser = (user) => ({ name: user.name, email: user.email, role: user.role });

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password are required." });
    if (await User.exists({ email: email.trim().toLowerCase() })) return res.status(409).json({ message: "This email is already registered." });
    const user = await User.create({ name: name.trim(), email: email.trim(), passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ user: publicUser(user) });
  } catch (error) { next(error); }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email?.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(req.body.password || "", user.passwordHash))) return res.status(401).json({ message: "Invalid email or password." });
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ user: publicUser(user), token });
  } catch (error) { next(error); }
};
