import Order from '../model/orderModel.js'
import Product from '../model/productModel.js';



export const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const shopId = req.user.shopId;

        if (!products || products.length === 0) {
            return res.status(400).json({ message: "Products required" });
        }

        const merged = {};

        for (let item of products) {
            if (!item.productId || !item.quantity) {
                return res.status(400).json({ message: "Invalid product data" });
            }

            if (merged[item.productId]) {
                merged[item.productId] += item.quantity;
            } else {
                merged[item.productId] = item.quantity;
            }
        }

        let totalPrice = 0;
        let orderProducts = [];

        for (let id in merged) {
            const productData = await Product.findById(id);

            if (!productData) {
                return res.status(404).json({ message: "Product not found" });
            }

            const quantity = merged[id];
            const price = productData.productPrice;

            totalPrice += price * quantity;

            orderProducts.push({
                productId: id,
                quantity,
                price
            });
        }

        const newOrder = await Order.create({
            shopId,
            products: orderProducts,
            totalPrice
        });

        return res.status(201).json({
            message: "Order Created",
            data: newOrder
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error", stack: error.stack });
    }
};


export const getOrders = async (req, res) => {

    try {
        const shopId = req.user.shopId;

        const orders = await Order.find({ shopId }).populate("products");
        console.log("orders", orders)

        return res.status(200).json({
            message: "Orders fetched",
            data: orders
        })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", stack: error.stack });
    }
}



