import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const createUser = async (req, res) => {
    const { name, password } = req.body;
    try {
        if (!name && !password) {
            return res.status(400).json({ message: "Name and Password are required" });
        }
        const existingUser = await User.findOne({
            name: name
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name,
            password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });
    }
}

export const loginUser = async (req, res) => {
    const { name, password } = req.body;

    try {
        if (!name || !password) {
            return res.status(400).json({
                message: "Name and Password are required",
            });
        }

        const existingUser = await User.findOne({ name });
        if (!existingUser) {
            return res.status(400).json({
                message: "User does not exist",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({
                message: "JWT secret key not configured",
            });
        }

        const payload = {
            sub: existingUser._id,
            username: existingUser.name,
            role: existingUser.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: "24h",
        });

        return res.status(200).json({
            data: name,
            message: "User logged in successfully",
            token,
            role:existingUser.role
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
        });
    }
};

export const allUser = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        return res.status(200).json({
            status: true,
            message: "User fetched successfully",
            data: users,
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: false,
                message: "User id is required"
            });
        }

        const existingUser = await User.findByIdAndDelete(id);

        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            status: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};

