import { Link } from "react-router-dom";

function OrderSuccess() {

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-md text-center max-w-md">

        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for renting with us. Your order has been placed successfully.
        </p>

        <div className="flex gap-4 justify-center">

          <Link to="/orders">
            <button className="bg-black text-white px-6 py-3 rounded-lg">
              View Orders
            </button>
          </Link>

          <Link to="/products">
            <button className="border px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>

        </div>

      </div>

    </div>

  );

}

export default OrderSuccess;
