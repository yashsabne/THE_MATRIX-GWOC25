const express = require("express");
const mongoose = require("mongoose");
const Product = require("../models/Products"); // Assuming you have a Product model
const router = express.Router();

// Route to fetch paginated products
router.get("/getProducts", async (req, res) => {
  try {
    let { page = 1, limit = 5 } = req.query; // Default to page 1, limit 5
    page = parseInt(page);
    limit = parseInt(limit);

    const products = await Product.find()
      .skip((page - 1) * limit) // Skip previous pages
      .limit(limit); // Get only the required products

    const totalProducts = await Product.countDocuments(); // Total products in DB

    res.json({
      success: true,
      products,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/get-details/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);


    console.log(product)

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error)
  }
});

module.exports = router;
