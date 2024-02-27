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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMoneyController = exports.AuthController = exports.AccountController = void 0;
const user_service_1 = require("./user.service");
// export const registerUser = async (req: Request, res: Response) => {
//   try {
//     const { userData } = req.body;
//     // Register a new user
//     const result = await RegisterUser(userData);
//     if (result.success) {
//       return res.status(201).json(result);
//     } else {
//       return res.status(400).json(result);
//     }
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };
exports.AccountController = {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const result = yield user_service_1.AccountService.registerUser(body);
                return res.status(result.success ? 201 : 400).json(result);
            }
            catch (error) {
                console.error("Error registering user:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    },
    registerAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { body } = req;
                const result = yield user_service_1.AccountService.registerAgent(body);
                return res.status(result.success ? 201 : 400).json(result);
            }
            catch (error) {
                console.error("Error registering agent:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    },
    approveAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { agentMobileNumber } = req.params;
                const result = yield user_service_1.AccountService.approveAgent(agentMobileNumber);
                return res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                console.error("Error approving agent:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    },
    addMoneyToAgent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { agentMobileNumber } = req.params;
                const { amount } = req.body;
                const result = yield user_service_1.AccountService.addMoneyToAgent(agentMobileNumber, amount);
                return res.status(result.success ? 200 : 404).json(result);
            }
            catch (error) {
                console.error("Error adding money to agent account:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    },
};
exports.AuthController = {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { identifier, pin } = req.body;
                const token = yield user_service_1.AuthService.authenticateUser(identifier, pin);
                if (token) {
                    return res.status(200).json({ success: true, token });
                }
                else {
                    return res
                        .status(401)
                        .json({ success: false, message: "Invalid credentials" });
                }
            }
            catch (error) {
                console.error("Login error:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal server error" });
            }
        });
    },
};
const sendMoneyController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { senderId, receiverPhone, amount } = req.body;
        // Call the service function to send money
        const result = yield (0, user_service_1.sendMoney)(senderId, receiverPhone, amount);
        // Send response
        return res.status(result.success ? 200 : 400).json(result);
    }
    catch (error) {
        console.error("Error sending money:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.sendMoneyController = sendMoneyController;
