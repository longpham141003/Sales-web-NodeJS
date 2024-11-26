import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: false
    },
    newPrice: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: Number,
        default: 0
    },
    images: [{
        type: String 
    }]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
