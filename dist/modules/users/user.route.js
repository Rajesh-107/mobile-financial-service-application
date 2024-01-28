"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post("/", user_controller_1.userController.createStudent);
router.get("/", user_controller_1.userController.getAllUsers);
router.get("/:userId", user_controller_1.userController.getSingleUser);
router.delete("/:userId", user_controller_1.userController.deleteSingleUser);
router.put("/:userId", user_controller_1.userController.singleUserDataUpdate);
router.put("/:userId/orders", user_controller_1.userController.addProductToOrder);
router.get("/:userId/orders", user_controller_1.userController.getAllOrdersForUser);
app.get("/:userId/orders/total-price", user_controller_1.userController.calculateTotalPriceForUser);
exports.UsersRoutes = router.get("");
