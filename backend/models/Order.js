const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  size: String,
  qty: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [orderItemSchema],
  totalPrice: Number,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Processing' },
  shippingAddress: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
