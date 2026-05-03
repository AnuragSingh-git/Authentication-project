import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  try {
    let token=req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, "bcskjabsckjnsnlkcnlkas");

    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};