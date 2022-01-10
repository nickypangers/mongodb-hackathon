const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: Number,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  total_price: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
