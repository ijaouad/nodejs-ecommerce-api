import Order from '../models/Order.js'



// GET Oders BY USER ID
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({userId: req.params.userId});
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}


// GET ALL ORDERS
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
}


// GET MONTHLY INCOME
export const getMonthlyIncome = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.agregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                    sales: '$amount'
                }
            },
            {
                $group:{
                    _id: '$month',
                    total: { $sum: '$sales' }
                }
            }
        ]);
        res.status(200).json(income)
    } catch (err) {
        res.status(500).json(err)
    }
}


// CREATE ORDER
export const createOrder = async (req, res) => {
    const order = new Order(req.body);

    try {
        const savedOrder = await order.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
}


// UPDATE ORDER
export const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);       
    }
}


// DELETE ORDER
export const deleteOrder = async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Successfully deleted the order');
    } catch (err) {
        res.status(500).json(err);
    }
}


