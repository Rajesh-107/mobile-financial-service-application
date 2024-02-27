import { Request, Response } from "express";
import {
  AccountService,
  AuthService,
  RegisterUser,
  sendMoney,
} from "./user.service";

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

export const AccountController = {
  async registerUser(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await AccountService.registerUser(body);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
      console.error("Error registering user:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async registerAgent(req: Request, res: Response) {
    try {
      const { body } = req;
      const result = await AccountService.registerAgent(body);
      return res.status(result.success ? 201 : 400).json(result);
    } catch (error) {
      console.error("Error registering agent:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async approveAgent(req: Request, res: Response) {
    try {
      const { agentMobileNumber } = req.params;
      const result = await AccountService.approveAgent(agentMobileNumber);
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      console.error("Error approving agent:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  async addMoneyToAgent(req: Request, res: Response) {
    try {
      const { agentMobileNumber } = req.params;
      const { amount } = req.body;
      const result = await AccountService.addMoneyToAgent(
        agentMobileNumber,
        amount
      );
      return res.status(result.success ? 200 : 404).json(result);
    } catch (error) {
      console.error("Error adding money to agent account:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const { identifier, pin } = req.body;

      const token = await AuthService.authenticateUser(identifier, pin);

      if (token) {
        return res.status(200).json({ success: true, token });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },
};

export const sendMoneyController = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverPhone, amount } = req.body;

    // Call the service function to send money
    const result = await sendMoney(senderId, receiverPhone, amount);

    // Send response
    return res.status(result.success ? 200 : 400).json(result);
  } catch (error) {
    console.error("Error sending money:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
