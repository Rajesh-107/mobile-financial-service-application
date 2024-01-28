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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield user_service_1.userDetailsService.createUserIntoDb(userData);
        res.status(200).json({
            success: true,
            message: "user created successfully",
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userDetailsService.getAllUserFromDb(); // Added parentheses to call the function
        res.status(200).json({
            success: true,
            message: "Users found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const result = yield user_service_1.userDetailsService.getSingleUserFromDB(UserId);
        res.status(200).json({
            success: true,
            message: "Single user data found successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userDetailsService.deleteSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Single user data deleted successfully",
            data: result,
        });
    }
    catch (error) {
        if (error.message === "User not found") {
            res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        else {
            // Handle other errors
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            });
        }
    }
});
const singleUserDataUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserId = req.params.userId;
        const updatedData = req.body;
        const existingStudent = yield user_service_1.userDetailsService.getSingleUserFromDB(UserId);
        if (!existingStudent || existingStudent.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const result = yield user_service_1.userDetailsService.updateSingleUserInDB(UserId, updatedData);
        res.status(200).json({
            success: true,
            message: "Single User data updated successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { productName, price, quantity } = req.body;
        const updatedUser = yield user_service_1.userDetailsService.addProductToOrder(userId, {
            productName,
            price,
            quantity,
        });
        res.status(200).json({
            success: true,
            message: "Product added to the user's order successfully",
            data: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
        });
    }
});
exports.userController = {
    createStudent,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    singleUserDataUpdate,
    addProductToOrder, // Add this line to expose the new function
};
