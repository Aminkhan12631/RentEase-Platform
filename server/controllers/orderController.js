const Order = require("../models/Order");


// GET ALL ORDERS (ADMIN)
const getAllOrders = async (req,res)=>{

try{

const orders = await Order.find()
.populate("user","name email");

res.json({
success:true,
orders
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};



// UPDATE ORDER STATUS
const updateOrderStatus = async(req,res)=>{

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

};


module.exports = {
getAllOrders,
updateOrderStatus
};
