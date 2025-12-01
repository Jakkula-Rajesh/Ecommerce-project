const Order = require('../models/Order');      // FIXED
const Cart = require('../models/Cart');        // FIXED
const sendOrderEmail = require('../utils/sendEmail'); // unchanged


exports.createOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: user._id }).populate('items.product');
    if (!cart || !cart.items.length) return res.status(400).json({ message: 'Cart is empty' });

    let total = 0;
    const orderItems = cart.items.map(i => {
      const price = i.product.price;
      total += price * i.qty;
      return {
        product: i.product._id,
        name: i.product.name,
        size: i.size,
        qty: i.qty,
        price
      };
    });

    const order = await Order.create({
      user: user._id,
      items: orderItems,
      totalPrice: total,
      shippingAddress
    });

    cart.items = [];
    await cart.save();

    await sendOrderEmail(order, user.email);

    res.json({ orderId: order._id, message: 'Order placed' });
  } catch (err) { next(err); }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { next(err); }
};
