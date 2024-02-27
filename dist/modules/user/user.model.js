"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.User = exports.Admin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Define admin schema
const adminSchema = new mongoose_1.default.Schema({
    name: String,
    pin: String,
    mobileNumber: { type: String, unique: true },
    email: { type: String, unique: true },
});
// Define user schema
const userSchema = new mongoose_1.default.Schema({
    name: String,
    pin: String,
    mobileNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    accountType: String,
    nid: { type: String, unique: true },
    balance: { type: Number, default: 40 },
});
// Define agent schema
const agentSchema = new mongoose_1.default.Schema({
    name: String,
    pin: String,
    mobileNumber: { type: String, unique: true },
    email: { type: String, unique: true },
    nid: { type: String, unique: true },
    balance: { type: Number, default: 100000 },
    approved: { type: Boolean, default: false },
});
// Create and export Admin model
exports.Admin = mongoose_1.default.model("Admin", adminSchema);
// Create and export User model
exports.User = mongoose_1.default.model("User", userSchema);
// Create and export Agent model
exports.Agent = mongoose_1.default.model("Agent", agentSchema);
