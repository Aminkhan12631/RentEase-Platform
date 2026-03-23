import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQty,
    decreaseQty,
    total
  } = useCart();

  const placeOrder = async () => {

    const orderData = {
      products: cartItems,
      totalPrice: total
    };

    try {

      const res = await fetch("https://rentease-backend-hv56.onrender.com/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Placed Successfully 🎉");
      }

    } catch (error) {
      console.log(error);
    }

  };

  return (
    <div className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">

        {/* CART ITEMS */}

        <div className="md:col-span-2 space-y-6">

          <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

          {cartItems.length === 0 && (
            <p className="text-gray-600">No products in cart.</p>
          )}

          {cartItems.map((item) => (

            <div
              key={item.id}
              className="bg-white p-6 rounded-3xl shadow-md flex items-center justify-between"
            >

              <div className="flex items-center gap-6">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 object-cover rounded-xl"
                />

                <div>

                  <h2 className="text-lg font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹{item.price}/month
                  </p>

                  <p className="text-gray-500 text-sm">
                    Duration: {item.duration} months
                  </p>

                  <p className="text-gray-500 text-sm">
                    Deposit: ₹{item.deposit}
                  </p>

                  {/* QUANTITY */}

                  <div className="flex items-center gap-3 mt-3">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>

                  </div>

                  {/* ITEM TOTAL */}

                  <p className="mt-2 font-semibold">

                    ₹{item.price} × {item.duration} × {item.quantity}

                    = ₹{(item.price || 0) * item.duration * item.quantity}

                  </p>

                </div>

              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>

            </div>

          ))}

        </div>

        {/* ORDER SUMMARY */}

        <div className="bg-white p-8 rounded-3xl shadow-md h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span className="font-semibold">₹{total}</span>
          </div>

          <button
            onClick={placeOrder}
            className="w-full bg-black text-white py-3 rounded-full hover:scale-105 transition"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;
