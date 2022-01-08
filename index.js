import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv'

import authRouter from './routes/auth.js'
import usersRouter from './routes/users.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'
import cartRouter from './routes/cart.js'


env.config()

const app = express();

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('Successfuly connected to MongoDB'))
    .catch((err) => console.log(err))
;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Home route')
})

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/orders', ordersRouter);


const PORT = 8080
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`))