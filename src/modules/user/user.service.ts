// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import validateRegistration from "./user.validation";
// import User from "./user.model";

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

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin, Agent, User } from "./user.model";

export const AccountService = {
  // Method to register a new user
  async registerUser(
    userData: any
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Hash encrypt the PIN
      const hashedPin = await bcrypt.hash(userData.pin, 10);

      // Create new user
      const newUser = new User({ ...userData, pin: hashedPin });
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

      return { success: true, message: "User registered successfully", token };
    } catch (error) {
      console.error("Error registering user:", error);
      return { success: false, message: "Failed to register user" };
    }
  },

  // Method to register a new agent
  async registerAgent(
    agentData: any
  ): Promise<{ success: boolean; message: string }> {
    try {
      // Hash encrypt the PIN
      const hashedPin = await bcrypt.hash(agentData.pin, 10);
      // Create new agent
      const newAgent = new Agent({ ...agentData, pin: hashedPin });
      await newAgent.save();
      return { success: true, message: "Agent registered successfully" };
    } catch (error) {
      console.error("Error registering agent:", error);
      return { success: false, message: "Failed to register agent" };
    }
  },

  // Method to approve an agent by admin
  async approveAgent(
    agentMobileNumber: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const agent = await Agent.findOne({ mobileNumber: agentMobileNumber });
      if (!agent) {
        return { success: false, message: "Agent not found" };
      }
      agent.approved = true;
      await agent.save();
      return { success: true, message: "Agent approved successfully" };
    } catch (error) {
      console.error("Error approving agent:", error);
      return { success: false, message: "Failed to approve agent" };
    }
  },

  // Method to add money to agent's account by admin
  async addMoneyToAgent(
    agentMobileNumber: string,
    amount: number
  ): Promise<{ success: boolean; message: string }> {
    try {
      const agent = await Agent.findOne({ mobileNumber: agentMobileNumber });
      if (!agent) {
        return { success: false, message: "Agent not found" };
      }
      agent.balance += amount;
      await agent.save();
      return {
        success: true,
        message: `${amount} taka added to agent's account successfully`,
      };
    } catch (error) {
      console.error("Error adding money to agent account:", error);
      return {
        success: false,
        message: "Failed to add money to agent account",
      };
    }
  },
};

export class AuthService {
  static async authenticateUser(
    identifier: string,
    pin: string
  ): Promise<string | null> {
    try {
      const user = await User.findOne({
        $or: [{ mobileNumber: identifier }, { email: identifier }],
      });

      if (!user) {
        return null;
      }

      const isMatch = await bcrypt.compare(pin, user.pin);

      if (!isMatch) {
        return null;
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return token;
    } catch (error) {
      console.error("Error authenticating user:", error);
      throw new Error("Internal server error");
    }
  }
}

export const sendMoney = async (
  senderId: string,
  receiverPhone: string,
  amount: number
): Promise<{ success: boolean; message: string }> => {
  try {
    // Find sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ phone: receiverPhone });

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
    await sender.save();
    await receiver.save();

    // Update admin's balance
    const admin = await Admin.findOne();
    if (!admin) {
      return { success: false, message: "Admin not found" };
    }
    admin.balance += transactionFee;
    await admin.save();

    // Send notification to the user
    // Implement notification logic here

    return { success: true, message: "Transaction completed successfully" };
  } catch (error) {
    console.error("Error sending money:", error);
    return { success: false, message: "Internal server error" };
  }
};
