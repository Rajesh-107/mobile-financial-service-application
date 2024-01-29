import { userDetails } from "./user.interface";
import { UserDetailModel } from "./user.model";

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

const updateSingleUserInDB = async (userId: number, updatedData: any) => {
  const options = { new: true };
  const result = await UserDetailModel.findOneAndUpdate(
    { userId },
    { $set: updatedData },
    options
  );

  return result;
};

const addProductToOrder = async (userId: number, orderData: any) => {
  const existingUser = await UserDetailModel.findOne({ userId });

  if (!existingUser) {
    throw new Error("User not found");
  }

  if (!existingUser.orders) {
    existingUser.orders = [];
  }

  existingUser.orders.push({
    productName: orderData.productName,
    price: orderData.price,
    quantity: orderData.quantity,
  });

  const updatedUser = await existingUser.save();

  return updatedUser;
};

// const calculateTotalPriceForUser = async (userId: number) => {
//   try {
//     const existingUser = await UserDetailModel.findOne({ userId });

//     if (!existingUser) {
//       throw new Error("User not found");
//     }

//     const totalPrice = existingUser.calculateTotalPrice();

//     return totalPrice;
//   } catch (error) {
//     throw error;
//   }
// };

export const userDetailsService = {
  createUserIntoDb,
  getAllUserFromDb,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
  updateSingleUserInDB,
  addProductToOrder,
};
