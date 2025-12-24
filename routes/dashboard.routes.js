import express from "express";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard-data", authMiddleware, async (req, res) => {
  res.json({ data: "This is protected data" });
});

export default router;
