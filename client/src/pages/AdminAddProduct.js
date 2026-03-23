import { useState } from "react";

function AdminAddProduct(){

const [name,setName] = useState("");
const [price,setPrice] = useState("");
const [image,setImage] = useState("");

const addProduct = async()=>{

const token = localStorage.getItem("token");

await fetch("https://rentease-backend-hv56.onrender.com/api/products/add",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":token
},

body:JSON.stringify({
name,
price,
image
})

});

alert("Product Added");

};

return(

<div>

<h1>Add Product</h1>

<input placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
<input placeholder="Price" onChange={(e)=>setPrice(e.target.value)}/>
<input placeholder="Image URL" onChange={(e)=>setImage(e.target.value)}/>

<button onClick={addProduct}>
Add Product
</button>

</div>

);

}

export default AdminAddProduct;
