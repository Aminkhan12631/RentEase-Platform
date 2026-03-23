import { Link } from "react-router-dom";

function PaymentSuccess() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="mb-6">
        Your order has been placed successfully.
      </p>

      <Link
        to="/orders"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        View Orders
      </Link>

    </div>

  );

}

export default PaymentSuccess;
