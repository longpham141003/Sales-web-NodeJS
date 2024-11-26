import mongoose from 'mongoose';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: [true, 'Vui lòng nhập tên danh mục']
    },
    image: {
        type: String,  
        required: [true, 'Vui lòng nhập ảnh cho danh mục']
    }
}, {
    timestamps: true 
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;
