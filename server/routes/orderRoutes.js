const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// CREATE ORDER
router.post("/create", authMiddleware , async (req, res) => {

  try {

    const { products, totalPrice, deliveryDate, paymentMethod } = req.body;

    const order = new Order({
      user:req.userId,
      products,
      totalPrice,
      deliveryDate,
      paymentMethod,
      status: "Processing"
    });

    await order.save();

    res.json({
      success: true,
      message: "Order saved"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// GET ALL ORDERS (ADMIN)
router.get("/all", authMiddleware , adminMiddleware , async (req, res) => {

  try {

    const orders = await Order.find()
    .populate("user","name email");

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// UPDATE ORDER STATUS (ADMIN)
router.put("/status/:id", authMiddleware , adminMiddleware , async (req,res)=>{

  try{

    const {status} = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {status},
      {new:true}
    );

    res.json({
      success:true,
      order
    });

  }catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

});


// DELETE ORDER
router.delete("/delete/:id", async (req, res) => {

  try {

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Order cancelled"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});


// GET MY ORDERS
router.get("/my-orders", authMiddleware , async (req, res) => {

  try {

    const orders = await Order.find({
      user: req.userId
    });

    res.json({
      success: true,
      orders
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

});

module.exports = router;
