import Shop from '../model/shopModel.js'

export const getShopDetails = async (req, res) => {
    try {
        const shop = await Shop.findById(req.user.shopId);
        if (!shop) {
            return res.status(404).json({ message: "Shop not found" });
        }
        return res.status(200).json({
            message: "Shop details fetched",
            data: shop
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message, stack: error.stack });

    }
}