import { userDetails } from "./user.interface";
import { UserDetailModel } from "./user.model";
import mongoose from "mongoose";

const createUserIntoDb = async (user: userDetails) => {
  const result = await UserDetailModel.create(user);
  return result;
};

const getAllUserFromDb = async (user: userDetails) => {
  const result = await UserDetailModel.find(user);
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserDetailModel.findOne({ userId });
  //   const result = await UserDetailModel.aggregate([{ $match: { id: id } }]);
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const result = await UserDetailModel.deleteOne({ userId });
  return result;
};

const updateSingleUserInDB = async (userId: number, updatedData) => {
  const options = { new: true };
  const result = await UserDetailModel.findOneAndUpdate(
    { userId },
    { $set: updatedData },
    options
  );

  return result;
};

const addProductToOrder = async (userId: number, orderData) => {
  try {
    const existingUser = await UserDetailModel.findOne({ userId });

    if (!existingUser) {
      throw new Error("User not found");
    }

    // Check if the 'orders' property exists, if not, create it
    if (!existingUser.orders) {
      existingUser.orders = [];
    }

    // Append the new product to the 'orders' array
    existingUser.orders.push({
      productName: orderData.productName,
      price: orderData.price,
      quantity: orderData.quantity,
    });

    // Save the updated user data
    const updatedUser = await existingUser.save();

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const userDetailsService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserInDB,
  addProductToOrder,
};
