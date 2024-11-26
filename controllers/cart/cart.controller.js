import Cart from '../../models/cart/cart.model.js';
import Product from '../../models/product/product.model.js';

export const getCartByUser = async (req, res) => {
  try {
      const cart = await Cart.findOne({ user: req.user.id })
          .populate('products.product', 'name price newPrice'); 

      if (!cart) {
          return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }
      return res.status(200).json({ cart });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi lấy giỏ hàng' });
  }
};



export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = new Cart({
                user: req.user.id,  
                products: [{
                    product: productId,
                    quantity: quantity,
                    totalPrice: product.newPrice * quantity
                }],
                totalAmount: product.newPrice * quantity
            });
        } else {
            const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity += quantity;
                cart.products[productIndex].totalPrice = product.newPrice * cart.products[productIndex].quantity;
            } else {
                cart.products.push({
                    product: productId,
                    quantity: quantity,
                    totalPrice: product.newPrice * quantity
                });
            }
            cart.totalAmount = cart.products.reduce((total, item) => total + item.totalPrice, 0);
        }

        await cart.save();
        return res.status(200).json({ message: 'Sản phẩm đã được thêm vào giỏ hàng', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi thêm sản phẩm vào giỏ hàng' });
    }
};

export const updateCart = async (req, res) => {
  try {
      const { productId, quantity } = req.body;
      const cart = await Cart.findOne({ user: req.user.id });

      if (!cart) {
          return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }

      const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
      if (productIndex === -1) {
          return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
      }

      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
      }

      cart.products[productIndex].quantity = quantity;
      cart.products[productIndex].totalPrice = product.newPrice * quantity;

      cart.totalAmount = cart.products.reduce((total, item) => total + item.totalPrice, 0);

      await cart.save();
      return res.status(200).json({ message: 'Giỏ hàng đã được cập nhật', cart });
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Lỗi server khi cập nhật giỏ hàng' });
  }
};


export const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const cart = await Cart.findOne({ user: req.user.id });

        if (!cart) {
            return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
        }

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Sản phẩm không có trong giỏ hàng' });
        }

        cart.products.splice(productIndex, 1);

        cart.totalAmount = cart.products.reduce((total, item) => total + item.totalPrice, 0);

        await cart.save();
        return res.status(200).json({ message: 'Sản phẩm đã được xóa khỏi giỏ hàng', cart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Lỗi server khi xóa sản phẩm khỏi giỏ hàng' });
    }
};
