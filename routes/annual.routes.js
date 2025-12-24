import express from "express";
import dbConnect from "../config/db.js"; // DB connection file
import {
  getAnnualClients,
  createAnnualClient,
  updateAnnualClient,
  deleteAnnualClient,
} from "../controllers/annual.controller.js";

const router = express.Router();

// Middleware to connect DB on every request
router.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    res.status(500).json({ message: "Database connection failed", error: err.message });
  }
});

router.get("/", getAnnualClients);
router.post("/", createAnnualClient);
router.put("/:id", updateAnnualClient);
router.delete("/:id", deleteAnnualClient);

export default router;
