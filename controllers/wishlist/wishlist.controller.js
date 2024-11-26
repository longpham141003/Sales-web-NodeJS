import Wishlist from '../../models/wishlist/wishlist.model.js';
import Product from '../../models/product/product.model.js';
import mongoose from 'mongoose';

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user._id; 

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: 'Invalid productId format' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingWishlist = await Wishlist.findOne({ userId, productId });
    if (existingWishlist) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    const wishlistItem = new Wishlist({ userId, productId });
    await wishlistItem.save();

    return res.status(201).json({ message: 'Product added to wishlist', wishlistItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId }).populate('productId', '-__v');

    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    
    const wishlistItem = await Wishlist.findOneAndDelete({ userId, productId });
    if (!wishlistItem) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    res.status(200).json({ message: 'Product removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
