import express from "express";
import { 
    deleteUser, 
    getAllUsers, 
    getUserById, 
    getUsersStats, 
    updateUser 
} from "../controllers/users.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js";

const router = express.Router();


// GET ALL USERS
router.get('/', verifyTokenAndAdmin, getAllUsers);

// USERS STATS
router.get('/stats', verifyTokenAndAdmin, getUsersStats)

// GET ONE USER
router.get('/:id', verifyTokenAndAdmin, getUserById)

// UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, updateUser)

// DELETE ONE USER
router.delete('/:id', verifyTokenAndAuthorization, deleteUser);



export default router