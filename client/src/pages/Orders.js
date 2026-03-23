import { useEffect, useState } from "react";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

const fetchOrders = async () => {

const token = localStorage.getItem("token");

if(!token){
setOrders([]);
return;
}

const res = await fetch("https://rentease-backend-hv56.onrender.com/api/orders/my-orders",{

headers:{
"Authorization":`Bearer ${localStorage.getItem("token")}`
}

});

const data = await res.json();

setOrders(data.orders || []);

};

fetchOrders();

},[]);

  // ❌ Cancel Order
  const cancelOrder = async (id) => {

  try {

    await fetch(`https://rentease-backend-hv56.onrender.com/api/orders/delete/${id}`, {
      method: "DELETE"
    });

    setOrders(orders.filter((order) => order._id !== id));

  } catch (error) {

    console.log(error);

  }

};

  // 🔄 Return Order
  const returnOrder = (index) => {

    const updated = orders.map((order, i) =>
      i === index ? { ...order, status: "Returned" } : order
    );

    setOrders(updated);

  };

  return (

    <div className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

        <h1 className="text-3xl font-bold mb-8">
          My Orders
        </h1>

        {(!orders || orders.length === 0) && (
<p>No orders yet.</p>
)}

        {orders.map((order, index) => (

  <div key={index} className="border p-5 mb-5 rounded-xl">

    {order.products && order.products.map((p,i)=>(
      

      <div key={i}>

        <h2 className="text-lg font-semibold">
          {p.name}
        </h2>

        <p>
          Price: ₹{p.price}
        </p>

        <p>
          Quantity: {p.quantity}
        </p>

      </div>

    ))}

    <p className="font-bold mt-2">
      Total Price: ₹{order.totalPrice}
    </p>

    <p className="text-blue-500 font-semibold">
      Status: {order.status}
    </p>

    <div className="mt-4 flex gap-3">

      <button
        className="bg-red-500 text-white px-4 py-1 rounded"
        onClick={() => cancelOrder(order._id)}
      >
        Cancel
      </button>

      <button
        className="bg-green-500 text-white px-4 py-1 rounded"
        onClick={() => returnOrder(index)}
      >
        Return
      </button>

    </div>

  </div>

))}

      </div>

    </div>

  );

}

export default Orders;
