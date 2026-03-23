import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminDashboard(){

const [products,setProducts] = useState([]);

const [form,setForm] = useState({
name:"",
image:"",
rent:"",
category:"",
description:""
});

const [editingId,setEditingId] = useState(null);

useEffect(()=>{

fetch("https://rentease-backend.onrender.com/api/products")
.then(res=>res.json())
.then(data=>setProducts(data));

},[]);


// handle input
const handleChange = (e)=>{

setForm({
...form,
[e.target.name]:e.target.value
});

};


// ADD PRODUCT
const addProduct = async()=>{

await fetch(
"https://rentease-backend.onrender.com/api/products/add",
{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify(form)
}
);

alert("Product Added");

window.location.reload();

};


// DELETE PRODUCT
const deleteProduct = async(id)=>{

await fetch(
`https://rentease-backend.onrender.com/api/products/delete/${id}`,
{
method:"DELETE",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
}
}
);

alert("Product Deleted");

window.location.reload();

};


// EDIT PRODUCT
const editProduct = (product)=>{

setEditingId(product._id);

setForm({
name:product.name,
image:product.image,
rent:product.rent,
category:product.category,
description:product.description
});

};


// UPDATE PRODUCT
const updateProduct = async()=>{

try{

const res = await fetch(
`https://rentease-backend.onrender.com/api/products/update/${editingId}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify(form)
}
);

const data = await res.json();

console.log(data);

if(data.success){
alert("Product Updated");
window.location.reload();
}else{
alert("Update failed");
}

}catch(error){
console.log(error);
}

};



return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-10">
Admin Dashboard
</h1>


{/* ADD PRODUCT FORM */}

<div className="bg-gray-100 p-6 rounded mb-10">

<h2 className="text-xl font-semibold mb-4">

{editingId ? "Edit Product" : "Add Product"}

</h2>

<input
name="name"
placeholder="Product Name"
className="border p-2 mr-2"
onChange={handleChange}
value={form.name}
/>

<input
name="image"
placeholder="Image URL"
className="border p-2 mr-2"
onChange={handleChange}
value={form.image}
/>

<input
name="rent"
placeholder="Price"
className="border p-2 mr-2"
onChange={handleChange}
value={form.rent}
/>

<input
name="category"
placeholder="Category"
className="border p-2 mr-2"
onChange={handleChange}
value={form.category}
/>

<input
name="description"
placeholder="Description"
className="border p-2 mr-2"
onChange={handleChange}
value={form.description}
/>


{editingId ? (

<button
onClick={updateProduct}
className="bg-blue-500 text-white px-4 py-2"
>

Update Product

</button>

) : (

<button
onClick={addProduct}
className="bg-green-500 text-white px-4 py-2"
>

Add Product

</button>



)}

<br></br>
<br></br>
<br></br>
<Link to="/admin-orders">
<button className="bg-black text-white px-4 py-2">
View Orders
</button>
</Link>

</div>


{/* PRODUCT LIST */}

{products.map((p)=>(

<div key={p._id} className="border p-4 mb-4">

<img
src={p.image}
alt={p.name}
className="h-32 mb-2"
/>

<h2 className="text-lg font-bold">
{p.name}
</h2>

<p>
₹{p.rent}
</p>

<div className="flex gap-3 mt-3">

<button
onClick={()=>editProduct(p)}
className="bg-yellow-500 text-white px-4 py-1"
>
Edit
</button>

<button
onClick={()=>deleteProduct(p._id)}
className="bg-red-500 text-white px-4 py-1"
>
Delete
</button>

</div>

</div>

))}

</div>

);

}

export default AdminDashboard;