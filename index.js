import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user/user.routes.js';
import categoryRoutes from './routes/category/category.routes.js';
import productRoutes from './routes/product/product.routes.js';
import wishlistRoutes from './routes/wishlist/wishlist.routes.js';
import cartRoutes from './routes/cart/cart.routes.js';
import checkoutRoutes from './routes/checkout/checkout.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/uploads', express.static('uploads'));

app.use('/api/users', userRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node API Server Updated');
});

// Kết nối MongoDB
mongoose.connect('mongodb+srv://longpham141003:Q.long2003@cluster0.qxqg0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

    .then(() => {
        console.log('Đã kết nối tới Database');
        app.listen(3000, () => {
            console.log('Server is listening on port 3000');
        });
    })
    .catch((err) => {
        console.error('Không thể kết nối tới Database', err);
    });
