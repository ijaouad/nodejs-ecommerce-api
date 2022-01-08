import express from "express";
import { 
    createOrder, deleteOrder, getAllOrders, getMonthlyIncome, getUserOrders, updateOrder
} from "../controllers/orders.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();


// GET ORDERS BY USER ID
router.get('/:id', verifyTokenAndAuthorization, getUserOrders);

// GET ALL ORDERS
router.get('/', verifyTokenAndAdmin, getAllOrders);

// GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, getMonthlyIncome)

// CREATE ORDER
router.post('/', verifyTokenAndAdmin, createOrder);

// UPDATE ORDER
router.put('/:id', verifyTokenAndAdmin, updateOrder);

// DELETE ORDER
router.delete('/:id', verifyTokenAndAdmin, deleteOrder);

export default router