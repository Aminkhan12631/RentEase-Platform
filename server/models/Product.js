const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({

name:String,

category:String,

rent:Number,

deposit:Number,

tenure:[Number],

description:String,

image:String,

availability:Boolean

});

module.exports=mongoose.model("Product",productSchema);
