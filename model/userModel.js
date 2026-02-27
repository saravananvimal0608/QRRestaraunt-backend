import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    shopId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
    role: {
        type: String,
        default: "salesman",
        required: true
    }
})
const User = mongoose.model('User', userSchema);
export default User;
