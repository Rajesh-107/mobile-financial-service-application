import express from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.post("/", userController.createStudent);
router.get("/", userController.getAllUsers);
router.get("/:userId", userController.getSingleUser);
router.delete("/:userId", userController.deleteSingleUser);
router.put("/:userId", userController.singleUserDataUpdate);

router.put("/:userId/orders", userController.addProductToOrder);

export const UsersRoutes = router.get("");
