import express from "express";
import { 
    createCart, deleteCart, getAllCarts, getUserCart, updateCart
} from "../controllers/cart.js";
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();


// GET CART BY USER ID
router.get('/:userId', verifyTokenAndAuthorization, getUserCart);

// GET ALL CARTS --just admin
router.get('/', verifyTokenAndAdmin, getAllCarts);

// CREATE CART
router.post('/', verifyToken, createCart);

// UPDATE CART
router.put('/:id', verifyTokenAndAuthorization, updateCart);

// DELETE CART
router.delete('/:id', verifyTokenAndAuthorization, deleteCart);



export default router