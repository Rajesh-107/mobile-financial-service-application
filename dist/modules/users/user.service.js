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
exports.userDetailsService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserDetailModel.create(user);
    return result;
});
const getAllUserFromDb = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserDetailModel.find(user);
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserDetailModel.findOne({ userId });
    //   const result = await UserDetailModel.aggregate([{ $match: { id: id } }]);
    return result;
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserDetailModel.deleteOne({ userId });
    return result;
});
const updateSingleUserInDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { new: true };
    const result = yield user_model_1.UserDetailModel.findOneAndUpdate({ userId }, { $set: updatedData }, options);
    return result;
});
const addProductToOrder = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.UserDetailModel.findOne({ userId });
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
    const updatedUser = yield existingUser.save();
    return updatedUser;
});
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
exports.userDetailsService = {
    createUserIntoDb,
    getAllUserFromDb,
    getSingleUserFromDB,
    deleteSingleUserFromDB,
    updateSingleUserInDB,
    addProductToOrder,
};
