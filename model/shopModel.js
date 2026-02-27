import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    ownerName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String },
    subscriptionPlan: {
        type: String,
        enum: ["Basic", "Pro", "Premium"],
        default: "Basic"
    },
    subscriptionExpiry: { type: Date }
}, { timestamps: true });

const Shop = mongoose.model("Shop", shopSchema);

export default Shop