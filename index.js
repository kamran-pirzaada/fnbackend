// index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import annualRoutes from "./routes/annual.routes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// db
connectDb();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/annual", annualRoutes);

// test
app.get("/", (req, res) => {
  res.send("Server is running");
});

// 🔥 LOCAL ONLY
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// 🔥 VERCEL
export default app;
