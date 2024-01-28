"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDetailModel = void 0;
const mongoose_1 = require("mongoose");
const config_1 = __importDefault(require("../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    userId: { type: Number, unique: true },
    username: { type: String },
    password: {
        type: String,
        required: true,
    },
    fullName: {
        firstName: {
            type: String,
            required: [true, "First Name is required"],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, "Last Name is required"],
            trim: true,
        },
    },
    age: { type: Number, required: true },
    email: { type: String, unique: true, required: [true, "Email is required"] },
    isActive: {
        type: Boolean,
        default: true,
    },
    hobbies: [{ type: String }],
    address: {
        street: { type: String },
        city: { type: String },
        country: { type: String },
    },
    orders: [
        {
            productName: { type: String },
            price: { type: Number },
            quantity: { type: Number },
        },
    ],
});
userSchema.pre("save", function (next) {
    const user = this;
    bcrypt_1.default.hash(user.password, Number(config_1.default.bycrypt_salt_round), function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
    // console.log(this, 'we saveed our data');
});
userSchema.statics.addProductToOrder = function (userId, orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield this.findOne({ userId });
        if (!user) {
            throw new Error("User not found");
        }
        user.orders = user.orders || [];
        user.orders.push(orderData);
        return user.save();
    });
};
userSchema.statics.calculateTotalPrice = function (userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield this.findOne({ userId });
            if (!user) {
                throw new Error("User not found");
            }
            if (!user.orders || user.orders.length === 0) {
                return 0;
            }
            const totalPrice = user.orders.reduce((acc, order) => acc + order.price * order.quantity, 0);
            return totalPrice;
        }
        catch (error) {
            throw error;
        }
    });
};
exports.UserDetailModel = (0, mongoose_1.model)("userDetails", userSchema);
