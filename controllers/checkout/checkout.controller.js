import Cart from '../../models/cart/cart.model.js';
import Checkout from '../../models/checkout/checkout.model.js';
import Product from '../../models/product/product.model.js';

export const checkout = async (req, res) => {
  try {
    const { receiverName, phoneNumber, address, ward, district, province } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'Giỏ hàng của bạn không có sản phẩm.' });
    }

    const totalAmount = cart.totalAmount;

    const products = await Promise.all(
      cart.products.map(async (item) => {
        const product = await Product.findById(item.product);
        return {
          product: item.product,
          quantity: item.quantity,
          totalPrice: item.totalPrice,
        };
      })
    );

    const checkoutOrder = new Checkout({
      user: req.user.id,
      cart: cart._id,
      receiverName,
      phoneNumber,
      address,
      ward,
      district,
      province,
      totalAmount,
      products,
    });

    await checkoutOrder.save();
    await Cart.findByIdAndDelete(cart._id);

    return res.status(201).json({
      message: 'Đặt hàng thành công',
      checkoutOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng' });
  }
};

export const updateCheckout = async (req, res) => {
  const { receiverName, phoneNumber, address, district, province } = req.body;
  try {
    const checkoutOrder = await Checkout.findById(req.params.id);
    if (!checkoutOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
    }

    checkoutOrder.receiverName = receiverName || checkoutOrder.receiverName;
    checkoutOrder.phoneNumber = phoneNumber || checkoutOrder.phoneNumber;
    checkoutOrder.address = address || checkoutOrder.address;
    checkoutOrder.district = district || checkoutOrder.district;
    checkoutOrder.province = province || checkoutOrder.province;

    await checkoutOrder.save();

    return res.status(200).json({
      message: 'Cập nhật đơn hàng thành công',
      checkoutOrder
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi cập nhật đơn hàng' });
  }
};

export const deleteCheckout = async (req, res) => {
  try {
    const checkoutOrder = await Checkout.findByIdAndDelete(req.params.id);
    if (!checkoutOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
    }

    return res.status(200).json({ message: 'Đơn hàng đã được xóa thành công.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi xóa đơn hàng' });
  }
};

export const getCheckoutById = async (req, res) => {
  try {
    if (req.params.id === "my-orders") {
      return getAllCheckoutsByUser(req, res);
    }

    const checkoutOrder = await Checkout.findById(req.params.id).populate('products.product');
    if (!checkoutOrder) {
      return res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
    }

    return res.status(200).json(checkoutOrder);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi lấy chi tiết đơn hàng' });
  }
};

export const getAllCheckouts = async (req, res) => {
  try {
    const checkoutOrders = await Checkout.find().populate('user').populate('cart');
    return res.status(200).json(checkoutOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng' });
  }
};

export const getAllCheckoutsByUser = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Thông tin người dùng không hợp lệ' });
    }

    const checkoutOrders = await Checkout.find({ user: req.user.id }).populate('products.product');

    if (!checkoutOrders || checkoutOrders.length === 0) {
      return res.status(404).json({ message: 'Bạn chưa đặt hàng nào.' });
    }

    return res.status(200).json(checkoutOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Lỗi server khi lấy danh sách đơn hàng' });
  }
};
