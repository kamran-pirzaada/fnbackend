import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import dbConnect from "../config/db.js"; // DB connection caching
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not defined");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
  try {
    // Connect to DB
    await dbConnect();

    const { username, password } = req.body;
    if (!username || !password) 
      return res.status(400).json({ message: "Username and password required" });

    // Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Unauthorized" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
