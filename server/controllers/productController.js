const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {

    const {
      name,
      category,
      rent,
      deposit,
      tenure,
      description,
      image,
      availability
    } = req.body;

    const product = await Product.create({
      name,
      category,
      rent,
      deposit,
      tenure,
      description,
      image,
      availability
    });

    res.status(201).json({
      message: "Product added successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {

    const products = await Product.find();

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT BY ID
exports.getProductById = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE PRODUCT

exports.updateProduct = async(req,res)=>{

try{

const product = await Product.findByIdAndUpdate(
req.params.id,
req.body,
{ new:true }
);

res.json({
success:true,
product
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {

    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
