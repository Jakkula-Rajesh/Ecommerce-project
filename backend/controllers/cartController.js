const Cart = require('../models/Cart');        // FIXED
const Product = require('../models/Product');  // FIXED


exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) cart = { items: [] };
    res.json(cart);
  } catch (err) { next(err); }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, size, qty } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existing = cart.items.find(i => String(i.product) === String(productId) && i.size === size);
    if (existing) existing.qty += qty || 1;
    else cart.items.push({ product: productId, size, qty: qty || 1 });

    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { next(err); }
};

exports.updateCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { items } = req.body;
    let cart = await Cart.findOne({ user: userId }) || new Cart({ user: userId, items: [] });

    cart.items = items.map(i => ({ product: i.product, size: i.size, qty: i.qty }));
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { next(err); }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, size } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });
    cart.items = cart.items.filter(i => !(String(i.product) === String(productId) && i.size === size));
    await cart.save();
    await cart.populate('items.product');
    res.json(cart);
  } catch (err) { next(err); }
};
