"use strict";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import validateRegistration from "./user.validation";
// import User from "./user.model";
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
exports.sendMoney = exports.AuthService = exports.AccountService = void 0;
// const registerUser = async (userData) => {
//   try {
//     // Validate user input data
//     const validationError = validateRegistration(userData);
//     if (validationError) throw new Error(validationError);
//     // Check if user with same mobile number or email already exists
//     const existingUser = await User.findOne({
//       $or: [{ mobileNumber: userData.mobileNumber }, { email: userData.email }],
//     });
//     if (existingUser) throw new Error("User already exists");
//     // Hash user's PIN
//     const hashedPin = await bcrypt.hash(userData.pin, 10);
//     // Create new user instance
//     const newUser = new User({
//       name: userData.name,
//       pin: hashedPin,
//       mobileNumber: userData.mobileNumber,
//       email: userData.email,
//       nid: userData.nid,
//     });
//     // Save new user to the database
//     await newUser.save();
//     // Generate JWT token for the newly registered user
//     const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
//     return { success: true, message: "User registered successfully", token };
//   } catch (error) {
//     console.error("User registration error:", error);
//     return { success: false, message: error.message };
//   }
// };
// export const UserServices = {
//   registerUser,
// };
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./user.model");
exports.AccountService = {
    // Method to register a new user
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash encrypt the PIN
                const hashedPin = yield bcrypt_1.default.hash(userData.pin, 10);
                // Create new user
                const newUser = new user_model_1.User(Object.assign(Object.assign({}, userData), { pin: hashedPin }));
                yield newUser.save();
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET);
                return { success: true, message: "User registered successfully", token };
            }
            catch (error) {
                console.error("Error registering user:", error);
                return { success: false, message: "Failed to register user" };
            }
        });
    },
    // Method to register a new agent
    registerAgent(agentData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash encrypt the PIN
                const hashedPin = yield bcrypt_1.default.hash(agentData.pin, 10);
                // Create new agent
                const newAgent = new user_model_1.Agent(Object.assign(Object.assign({}, agentData), { pin: hashedPin }));
                yield newAgent.save();
                return { success: true, message: "Agent registered successfully" };
            }
            catch (error) {
                console.error("Error registering agent:", error);
                return { success: false, message: "Failed to register agent" };
            }
        });
    },
    // Method to approve an agent by admin
    approveAgent(agentMobileNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield user_model_1.Agent.findOne({ mobileNumber: agentMobileNumber });
                if (!agent) {
                    return { success: false, message: "Agent not found" };
                }
                agent.approved = true;
                yield agent.save();
                return { success: true, message: "Agent approved successfully" };
            }
            catch (error) {
                console.error("Error approving agent:", error);
                return { success: false, message: "Failed to approve agent" };
            }
        });
    },
    // Method to add money to agent's account by admin
    addMoneyToAgent(agentMobileNumber, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = yield user_model_1.Agent.findOne({ mobileNumber: agentMobileNumber });
                if (!agent) {
                    return { success: false, message: "Agent not found" };
                }
                agent.balance += amount;
                yield agent.save();
                return {
                    success: true,
                    message: `${amount} taka added to agent's account successfully`,
                };
            }
            catch (error) {
                console.error("Error adding money to agent account:", error);
                return {
                    success: false,
                    message: "Failed to add money to agent account",
                };
            }
        });
    },
};
class AuthService {
    static authenticateUser(identifier, pin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.User.findOne({
                    $or: [{ mobileNumber: identifier }, { email: identifier }],
                });
                if (!user) {
                    return null;
                }
                const isMatch = yield bcrypt_1.default.compare(pin, user.pin);
                if (!isMatch) {
                    return null;
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
                return token;
            }
            catch (error) {
                console.error("Error authenticating user:", error);
                throw new Error("Internal server error");
            }
        });
    }
}
exports.AuthService = AuthService;
const sendMoney = (senderId, receiverPhone, amount) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find sender and receiver
        const sender = yield user_model_1.User.findById(senderId);
        const receiver = yield user_model_1.User.findOne({ phone: receiverPhone });
        if (!sender || !receiver) {
            return { success: false, message: "Sender or receiver not found" };
        }
        // Check minimum amount
        if (amount < 50) {
            return {
                success: false,
                message: "Minimum amount for sending money is 50 taka",
            };
        }
        // Calculate transaction fee
        const transactionFee = amount > 100 ? 5 : 0;
        // Check sender's balance
        if (sender.balance < amount + transactionFee) {
            return { success: false, message: "Insufficient balance" };
        }
        // Update balances
        sender.balance -= amount + transactionFee;
        receiver.balance += amount;
        yield sender.save();
        yield receiver.save();
        // Update admin's balance
        const admin = yield user_model_1.Admin.findOne();
        if (!admin) {
            return { success: false, message: "Admin not found" };
        }
        admin.balance += transactionFee;
        yield admin.save();
        // Send notification to the user
        // Implement notification logic here
        return { success: true, message: "Transaction completed successfully" };
    }
    catch (error) {
        console.error("Error sending money:", error);
        return { success: false, message: "Internal server error" };
    }
});
exports.sendMoney = sendMoney;
