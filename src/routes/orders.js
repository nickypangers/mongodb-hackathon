const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const data = await Order.find();
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { customer_name, customer_email, cart, total_price } = req.body;
    const product = new Order({
      customer_name,
      customer_email,
      cart,
      total_price,
    });
    const data = await product.save();
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { query } = req.body;

    const aggregate = await Order.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            must: [
              {
                equals: {
                  path: "_id",
                  value: new mongoose.Types.ObjectId(query),
                },
              },
            ],
          },
        },
      },
    ]).exec();

    return res.json({ success: true, data: aggregate });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

module.exports = router;
