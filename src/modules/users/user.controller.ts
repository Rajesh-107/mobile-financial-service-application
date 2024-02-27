import { userDetails } from "./user.interface";
import { Request, Response } from "express";
import { userDetailsService } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const userData: userDetails = req.body;

    const result = await userDetailsService.createUserIntoDb(userData);
    res.status(200).json({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;

    const result = await userDetailsService.getAllUserFromDb(userId);

    res.status(200).json({
      success: true,
      message: "Users found successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const UserId: any = req.params.userId;

    const result = await userDetailsService.getSingleUserFromDB(UserId);
    res.status(200).json({
      success: true,
      message: "Single user data found successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;

    const result = await userDetailsService.deleteSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Single user data deleted successfully",
      data: result,
    });
  } catch (error: any) {
    if (error.message === "User not found") {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      // Handle other errors
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
};

const singleUserDataUpdate = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const updatedData = req.body;

    const existingUser = await userDetailsService.getSingleUserFromDB(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const result = await userDetailsService.updateSingleUserInDB(
      userId,
      updatedData
    );

    res.status(200).json({
      success: true,
      message: "Single User data updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const addProductToOrder = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const { productName, price, quantity } = req.body;

    const updatedUser = await userDetailsService.addProductToOrder(userId, {
      productName,
      price,
      quantity,
    });

    res.status(200).json({
      success: true,
      message: "Product added to the user's order successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const getAllOrdersForUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const user = await userDetailsService.getSingleUserFromDB(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const orders = user.orders || [];
    res.status(200).json({
      success: true,
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
// const calculateTotalPriceForUser = async (req: Request, res: Response) => {
//   try {
//     const userId:any = req.params.userId;

//     const totalPrice = await userDetailsService.calculateTotalPriceForUser(
//       userId
//     );

//     res.status(200).json({
//       success: true,
//       message: "Total price calculated successfully!",
//       data: {
//         totalPrice: totalPrice,
//       },
//     });
//   } catch (error: any) {
//     if (error.message === "User not found") {
//       res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: "Internal Server Error",
//         error: error.message,
//       });
//     }
//   }
// };
export const userController = {
  createStudent,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  singleUserDataUpdate,
  addProductToOrder,
  getAllOrdersForUser,
};
