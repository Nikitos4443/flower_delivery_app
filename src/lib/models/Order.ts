import mongoose, { Schema } from "mongoose";
import { flowerSchema } from "./Flower";

const orderSchema = new Schema(
    {
        userName: String,
        userPhone: String,
        userEmail: String,
        userAddress: String,
        flowers: [
              {
                    flower: { type: flowerSchema, required: true },
                    count: { type: Number, required: true, min: 1 }
              }
        ],
        totalPrice: Number
    },
    { timestamps: true }
);

if (mongoose.models.Order) {
    mongoose.deleteModel("Order");
}

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
