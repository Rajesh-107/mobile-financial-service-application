import mongoose from "mongoose";

// Define admin schema
const adminSchema = new mongoose.Schema({
  name: String,
  pin: String,
  mobileNumber: { type: String, unique: true },
  email: { type: String, unique: true },
});

// Define user schema
const userSchema = new mongoose.Schema({
  name: String,
  pin: String,
  mobileNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  accountType: String,
  nid: { type: String, unique: true },
  balance: { type: Number, default: 40 },
});

// Define agent schema
const agentSchema = new mongoose.Schema({
  name: String,
  pin: String,
  mobileNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  nid: { type: String, unique: true },
  balance: { type: Number, default: 100000 },
  approved: { type: Boolean, default: false },
});

// Create and export Admin model
export const Admin = mongoose.model("Admin", adminSchema);

// Create and export User model
export const User = mongoose.model("User", userSchema);

// Create and export Agent model
export const Agent = mongoose.model("Agent", agentSchema);
