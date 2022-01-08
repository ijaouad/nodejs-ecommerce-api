import CryptoJS from "crypto-js";
import User from "../models/User.js";


// GET ALL USERS
export const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}


// USERS STATS
export const getUsersStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {  
                    _id: "$month",
                    total: { $sum : 1 }
                }
            }
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
}


// GET ONE USER
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}


// UPDATE USER
export const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);       
    }
}


// DELETE ONE USER
export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('Successfully deleted user');
    } catch (err) {
        res.status(500).json(err);
    }
}