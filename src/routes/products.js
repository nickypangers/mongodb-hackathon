const express = require("express");
const { range } = require("express/lib/request");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    const product = new Product({
      name,
      price,
      description,
      category,
      stock,
    });
    const data = await product.save();
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.get("/categories", async (req, res) => {
  console.log("category");
  try {
    const data = await Product.distinct("category");
    return res.json({ success: true, data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findById(id);
    return res.json({ success: true, data: data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Product.findByIdAndDelete(id);
    return res.json({ success: true, data: data });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/search/refine", async (req, res) => {
  try {
    const { name, price, discount_only, category } = req.body;

    const must = [];

    const priceExist = price.gt > 0 || price.lte > 0;

    if (name) {
      must.push({
        text: {
          query: name,
          path: "name",
        },
      });
    }

    if (category) {
      must.push({
        text: {
          query: category,
          path: "category",
        },
      });
    }

    if (priceExist) {
      if (discount_only) {
        must.push({
          range: {
            path: "discountedPrice",
            ...(price.gt && { gt: price.gt }),
            ...(price.lte > 0 && { lte: price.lte }),
          },
        });
      } else {
        must.push({
          range: {
            path: "price",
            ...(price.gt && { gt: price.gt }),
            ...(price.lte > 0 && { lte: price.lte }),
          },
        });
      }
    }

    if (!priceExist && discount_only) {
      must.push({
        range: {
          path: "discountedPrice",
          gt: 0,
        },
      });
    }

    const aggregate = await Product.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            must: must,
          },
        },
      },
    ]).exec();

    return res.json({ success: true, must, data: aggregate });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

router.post("/search", async (req, res) => {
  try {
    const { name } = req.body;

    const aggregate = await Product.aggregate([
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                text: {
                  query: name,
                  path: "name",
                },
              },
              {
                text: {
                  query: name,
                  path: "category",
                },
              },
            ],
          },
        },
      },
      {
        $project: {
          name: 1,
          discountedPrice: 1,
          category: 1,
          description: 1,
          stock: 1,
          price: 1,
          score: {
            $meta: "searchScore",
          },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
    ]).exec();
    return res.json({ success: true, data: aggregate });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

module.exports = router;
