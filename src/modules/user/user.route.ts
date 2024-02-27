// import express from "express";
// import { UserController } from "./user.controller";

//

// router.post("/register", UserController.registerUserController);
// // router.post("/login", loginUserController);

// export const UserRoutes = router;

import express from "express";
import {
  AccountController,
  AuthController,
  registerUser,
  sendMoneyController,
} from "./user.controller";

const router = express.Router();
// Route for user registration
router.post("/register", AccountController.registerUser);
// router.post("/register", registerUser);

// Route for agent registration
router.post("/register/agent", AccountController.registerAgent);

// Route for approving an agent by admin
router.put("/approve-agent/:agentMobileNumber", AccountController.approveAgent);

// Route for adding money to an agent's account by admin
router.put("/add-money/:agentMobileNumber", AccountController.addMoneyToAgent);

router.post("/login", AuthController.login);

router.post("/send-money", sendMoneyController);

export const UserRoutes = router;
