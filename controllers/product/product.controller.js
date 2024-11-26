import Product from '../../models/product/product.model.js';
import Category from '../../models/category/category.model.js';
import fs from 'fs';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category'); 
        return res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }
        return res.status(200).json({ product });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi lấy sản phẩm' });
    }
};

export const createProduct = async (req, res) => {
  try {
      const { category, name, description, oldPrice, newPrice, rating, reviews } = req.body;
      const images = req.files ? req.files.map(file => file.path) : [];

      if (!category || !name || !description || !newPrice) {
          return res.status(400).json({ message: 'Danh mục, tên, mô tả và giá mới là bắt buộc.' });
      }

      const parsedNewPrice = parseFloat(newPrice);
      if (isNaN(parsedNewPrice)) {
          return res.status(400).json({ message: 'Giá mới phải là một số hợp lệ.' });
      }

      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
          return res.status(404).json({ message: 'Danh mục không tồn tại' });
      }

      const newProduct = new Product({
          category,
          name,
          description,
          oldPrice: oldPrice ? parseFloat(oldPrice) : null,
          newPrice: parsedNewPrice,
          rating: rating || 0,
          reviews: reviews || 0,
          images,
      });

      const savedProduct = await newProduct.save();
      return res.status(201).json({
          message: 'Sản phẩm đã được tạo thành công',
          product: savedProduct,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi tạo sản phẩm' });
  }
};



export const updateProduct = async (req, res) => {
  try {
      const { name, description, oldPrice, newPrice, rating, reviews } = req.body;
      const images = req.files ? req.files.map(file => file.path) : []; // Lấy đường dẫn ảnh

      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      product.name = name || product.name;
      product.description = description || product.description;
      product.oldPrice = oldPrice || product.oldPrice;
      product.newPrice = newPrice || product.newPrice;
      product.rating = rating || product.rating;
      product.reviews = reviews || product.reviews;

      if (images.length) {
          product.images.forEach(image => {
              fs.unlinkSync(image);
          });
          product.images = images; 
      }

      const updatedProduct = await product.save();
      return res.status(200).json({
          message: 'Sản phẩm đã được cập nhật thành công',
          product: updatedProduct,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi cập nhật sản phẩm' });
  }
};


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        product.images.forEach(image => {
            fs.unlinkSync(image); 
        });

        await product.remove(); 
        return res.status(200).json({ message: 'Sản phẩm đã được xóa thành công' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm' });
    }
};
