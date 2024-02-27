import { Schema, model } from "mongoose";
import { userDetails } from "./user.interface";
import config from "../../config";
import bcrypt from "bcrypt";

const userSchema = new Schema<userDetails>({
  userId: { type: Number, unique: true },
  username: { type: String },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
    },
  },
  age: { type: Number, required: true },
  email: { type: String, unique: true, required: [true, "Email is required"] },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [{ type: String }],
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: Number },
      quantity: { type: Number },
    },
  ],
});

userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_round),
    function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    }
  );
});
userSchema.post("save", function (doc, next) {
  doc.password = "";

  next();
  // console.log(this, 'we saveed our data');
});

userSchema.statics.addProductToOrder = async function (
  userId: number,
  orderData: userDetails["orders"][]
) {
  const user = await this.findOne({ userId });
  if (!user) {
    throw new Error("User not found");
  }

  user.orders = user.orders || [];
  user.orders.push(orderData);

  return user.save();
};

export const UserDetailModel = model<userDetails>("userDetails", userSchema);
