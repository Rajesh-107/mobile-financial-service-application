"use strict";
// import express from "express";
// import { UserController } from "./user.controller";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
//
// router.post("/register", UserController.registerUserController);
// // router.post("/login", loginUserController);
// export const UserRoutes = router;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// Route for user registration
router.post("/register", user_controller_1.AccountController.registerUser);
// router.post("/register", registerUser);
// Route for agent registration
router.post("/register/agent", user_controller_1.AccountController.registerAgent);
// Route for approving an agent by admin
router.put("/approve-agent/:agentMobileNumber", user_controller_1.AccountController.approveAgent);
// Route for adding money to an agent's account by admin
router.put("/add-money/:agentMobileNumber", user_controller_1.AccountController.addMoneyToAgent);
router.post("/login", user_controller_1.AuthController.login);
router.post("/send-money", user_controller_1.sendMoneyController);
exports.UserRoutes = router;
