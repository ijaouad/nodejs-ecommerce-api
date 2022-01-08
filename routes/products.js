import express from "express";
import { 
    addProduct, deleteProduct, getAllProducts, getProductById, updateProduct
} from "../controllers/products.js";
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js";

const router = express.Router();


// GET PRODUCT BY ID
router.get('/:id', getProductById);

// GET ALL PRODUCTS
router.get('/', getAllProducts);

// ADD A PRODUCT
router.post('/', verifyTokenAndAdmin, addProduct);

// UPDATE PRODUCT
router.put('/:id', verifyTokenAndAdmin, updateProduct);

// DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, deleteProduct);


export default router