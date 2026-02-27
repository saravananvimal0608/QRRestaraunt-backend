import Product from "../model/productModel.js";

export const addProduct = async (req, res) => {

    const shopId = req.user.shopId

    const { productName, productPrice, category } = req.body;
    try {
        if (!productName || !productPrice || !category) {
            return res.status(400).json({ message: "Product Name And Product Price Are Required" })
        }
        const exitstinProduct = await Product.findOne({
            productName,
            shopId
        });

        if (exitstinProduct) {
            return res.status(409).json({ message: "Product Already Exists" });
        }

        const newProduct = new Product({
            productName,
            productPrice,
            category,
            shopId
        });

        await newProduct.save();

        return res.status(201).json({
            message: "Product Added Successfully",
            data: newProduct
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });

    }
}

export const getAllProducts = async (req, res) => {
    try {

        const shopId = req.user.shopId

        const products = await Product
            .find({ shopId })
            .populate("category");

        if (products.length === 0) {
            return res.status(200).json({ message: "No products found" });
        }

        return res.status(200).json(products);

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getSingleProduct = async (req, res) => {
    try {

                const shopId = req.user.shopId

        const { id } = req.params;

        const product = await Product.findOne({
            _id: id,
            shopId,
        }).populate("category");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({ message: "Product Fetched successfully", product });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const shopId = req.user.shopId
        const { categoryId } = req.params;

        const products = await Product.find({
            category: categoryId,
            shopId
        }).populate("category");

        if (products.length === 0) {
            return res.status(404).json({
                message: "No products found for this category"
            });
        }

        return res.status(200).json({ message: "Product Fetched successfully", products });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const shopId = req.user.shopId


        const { productName, productPrice, category } = req.body;

        const updateFields = {};

        if (productName) updateFields.productName = productName;
        if (productPrice) updateFields.productPrice = productPrice;
        if (category) updateFields.category = category;


        if (productName) {
            const existingProduct = await Product.findOne({
                productName,
                shopId
            });

            if (existingProduct) {
                return res.status(409).json({
                    message: "Product already exists"
                });
            }
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id: id, shopId },
            { $set: updateFields },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        return res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error"
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const shopId = req.user.shopId;


        const deletedProduct = await Product.findOneAndDelete({
            _id: id,
            shopId
        });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};
