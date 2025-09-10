import mongoose, { Schema } from "mongoose";

const flowerSchema = new Schema(
    {
        title: String,
        imageUrl: String,
        price: Number,
        shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" }
    },
    {
        timestamps: true,
    }
);

if (mongoose.models.Flower) {
    mongoose.deleteModel("Flower");
}

const Flower = mongoose.model("Flower", flowerSchema);

export default Flower;
export { flowerSchema };
