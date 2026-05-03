import User from "../model/user.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "bcskjabsckjnsnlkcnlkas",
      { expiresIn: "1d" }
    );

    res.cookie("token",token,{
      sameSite:"none",
      httpOnly:true,
      secure:true,
      path: "/"
    });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "bcskjabsckjnsnlkcnlkas",
      { expiresIn: "1d" }
    );

    res.cookie("token",token,{
      sameSite:"none",
      httpOnly:true,
      secure:true,
      path: "/"
    });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    const decoded = jwt.verify(token, "bcskjabsckjnsnlkcnlkas");

    const user = await User.findById(decoded.id);

    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
