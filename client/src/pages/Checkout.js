import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function Checkout() {

  const navigate = useNavigate();
  const { cartItems, total } = useCart();

  const [date, setDate] = useState("");
  const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [city, setCity] = useState("");
const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  
  const downloadInvoice = () => {

  const doc = new jsPDF();

  const orderId = "RE" + Math.floor(Math.random()*100000);

  const today = new Date().toLocaleDateString();

  doc.setFontSize(20);
  doc.text("RentEase Invoice", 20, 20);

  doc.setFontSize(12);

  doc.text(`Order ID: ${orderId}`, 20, 40);
  doc.text(`Date: ${today}`, 20, 50);

  doc.text(`Customer: ${name}`, 20, 70);
  doc.text(`Phone: ${phone}`, 20, 80);
  doc.text(`City: ${city}`, 20, 90);
  doc.text(`Address: ${address}`, 20, 100);

  let y = 120;

  doc.text("Products:", 20, y);

  y += 10;

  cartItems.forEach((item) => {

    doc.text(
      `${item.name} × ${item.quantity}  - ₹${item.price * item.quantity}`,
      20,
      y
    );

    y += 10;

  });

  doc.text(`Total Price: ₹${total}`, 20, y + 10);

  doc.save("RentEase-Invoice.pdf");

};

  // ✅ Save Order
  const placeOrder = async () => {

    const orderData = {
      deliveryDate: date,
      paymentMethod: paymentMethod,
      products: cartItems,
      totalPrice: total
    };

    try {

      //const token = localStorage.getItem("token");

const res = await fetch("https://rentease-backend.onrender.com/api/orders/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization":`Bearer ${localStorage.getItem("token")}`
  },
  body: JSON.stringify(orderData)
});

      const data = await res.json();

      if (data.success) {

        alert("Order Placed Successfully 🎉");

        downloadInvoice();

        localStorage.removeItem("cart");

        navigate("/order-success");
      }

    } catch (error) {

      console.log(error);

    }

  };
  
  return (
    <div className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-md">

        <h1 className="text-3xl font-bold mb-8">
          Checkout
        </h1>

        {/* Delivery Date */}

        <div className="mb-6">

          <label className="block font-semibold mb-2">
            Select Delivery Date
          </label>

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />

        </div>

        {/* Order Summary */}

        <div className="mb-8">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.duration * item.quantity}
              </span>

            </div>
          ))}

          <div className="border-t mt-4 pt-4 flex justify-between font-bold">

            <span>Total</span>
            <span>₹{total}</span>

          </div>

        </div>

        {/* Address */}

        <h2 className="text-xl font-semibold mb-4">
          Delivery Address
        </h2>

        <input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="border p-3 w-full mb-3 rounded"
/>

        <input
type="text"
placeholder="Phone Number"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="border p-3 w-full mb-3 rounded"
/>

        <input
type="text"
placeholder="City"
value={city}
onChange={(e)=>setCity(e.target.value)}
className="border p-3 w-full mb-3 rounded"
/>

        <textarea
placeholder="Full Address"
value={address}
onChange={(e)=>setAddress(e.target.value)}
className="border p-3 w-full mb-3 rounded"
/>

        {/* Payment Method */}

        <h2 className="text-xl font-semibold mb-4">
          Payment Method
        </h2>

        <div className="flex flex-col gap-3 mb-6">

          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            UPI
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Card"
              checked={paymentMethod === "Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit / Debit Card
          </label>

        </div>

        {/* Place Order Button */}

        <button
          onClick={placeOrder}
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;
