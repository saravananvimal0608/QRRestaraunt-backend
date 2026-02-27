import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    }
}, { timestamps: true })

const Category = mongoose.model('Category', categorySchema);
export default Category;