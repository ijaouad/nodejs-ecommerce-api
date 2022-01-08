import Cart from "../models/Cart.js";


// GET CART BY USER ID
export const getUserCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL CARTS
export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
}

// CREATE CART
export const createCart = async (req, res) => {
    const cart = new Cart(req.body);
    try {
        const savedCart = await cart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE CART
export const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);       
    }
}

// DELETE CART
export const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Successfully deleted the cart');
    } catch (err) {
        res.status(500).json(err);
    }
}
