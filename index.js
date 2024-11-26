import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoute from './routes/user/user.routes.js';
import categoryRoutes from './routes/category/category.routes.js';
import productRoutes from './routes/product/product.routes.js';
import wishlistRoutes from './routes/wishlist/wishlist.routes.js';
import cartRoutes from './routes/cart/cart.routes.js';
import checkoutRoutes from './routes/checkout/checkout.routes.js';

import config from './config.js';

const { mongoURL, port } = config;
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


mongoose.connect(mongoURL)
    .then(() => {
        console.log('Đã kết nối tới Database');
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Không thể kết nối tới Database', err);
    });

