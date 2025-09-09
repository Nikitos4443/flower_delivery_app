import mongoose, { Schema } from "mongoose";
import { flowerSchema } from "./Flower";

const orderSchema = new Schema(
    {
        userName: String,
        userPhone: String,
        userEmail: String,
        userAddress: String,
        flowers: [flowerSchema],
        totalPrice: Number
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
