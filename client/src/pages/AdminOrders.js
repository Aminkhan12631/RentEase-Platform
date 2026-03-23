import { useEffect, useState } from "react";

function AdminOrders(){

const [orders,setOrders] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/orders/all",{
headers:{
Authorization:`Bearer ${localStorage.getItem("token")}`
}
})
.then(res=>res.json())
.then(data=>setOrders(data.orders));

},[]);


const updateStatus = async(id,status)=>{

await fetch(
`http://localhost:5000/api/orders/status/${id}`,
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},
body:JSON.stringify({status})
}
);

alert("Order Status Updated");

window.location.reload();

};


return(

<div className="p-10">

<h1 className="text-3xl font-bold mb-8">
Admin Orders
</h1>

<table className="w-full border">

<thead className="bg-gray-200">

<tr>

<th className="p-2">Customer</th>
<th className="p-2">Products</th>
<th className="p-2">Total</th>
<th className="p-2">Delivery Date</th>
<th className="p-2">Status</th>

</tr>

</thead>

<tbody>

{orders.map((o)=>(

<tr key={o._id} className="border text-center">

<td className="p-2">
{o.user?.name}
</td>

<td className="p-2">
{o.products.length}
</td>

<td className="p-2">
₹{o.totalPrice}
</td>

<td className="p-2">
{o.deliveryDate}
</td>

<td className="p-2">

<select
value={o.status}
onChange={(e)=>updateStatus(o._id,e.target.value)}
className="border p-1"
>

<option>Processing</option>
<option>Shipped</option>
<option>Delivered</option>

</select>

</td>

</tr>

))}

</tbody>

</table>

</div>

);

}

export default AdminOrders;
