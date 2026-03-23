const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  products: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: Number,

  deliveryDate: String,

  paymentMethod: String,

  status: {
    type: String,
    default: "Processing"
  }

});

module.exports = mongoose.model("Order", orderSchema);
