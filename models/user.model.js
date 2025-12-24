import mongoose from "mongoose";

// DB connection caching for Vercel serverless
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // store hashed password
}, { timestamps: true }); // optional, adds createdAt and updatedAt

// Export User model
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
