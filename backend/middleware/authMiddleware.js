import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "development-only-secret-change-me";

export const auth = (req, res, next) => {
  try {
    req.user = jwt.verify(req.headers.authorization?.replace("Bearer ", ""), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Authentication required." });
  }
};

export const admin = [
  auth,
  (req, res, next) =>
    req.user.role === "admin" ? next() : res.status(403).json({ message: "Admin access required." }),
];
