const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// ADD PRODUCT (ADMIN)
router.post("/add", authMiddleware, adminMiddleware, addProduct);

// GET ALL PRODUCTS
router.get("/", getAllProducts);

// GET PRODUCT BY ID
router.get("/:id", getProductById);

// UPDATE PRODUCT (ADMIN)
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct);

// DELETE PRODUCT (ADMIN)
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
