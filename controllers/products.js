import Product from "../models/Product.js";


// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;
        if (qNew) {
            products = await Product.find().sort({ _id: -1 }).limit(5);
        } else if (qCategory) {
            products = await Product.find({ categories: { $in: qCategory } });
        } else if (qNew && qCategory) {
            products = await Product.find({ categories: { $in: qCategory } }).sort({ _id: -1 }).limit(5);
        } else {
            products = await Product.find();
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

// ADD PRODUCT
export const addProduct = async (req, res) => {
    const product = new Product(req.body);

    try {
        const savedProduct = await product.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
}


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);       
    }
}



// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Successfully deleted the product');
    } catch (err) {
        res.status(500).json(err);
    }
}