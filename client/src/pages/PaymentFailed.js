import { Link } from "react-router-dom";

function PaymentFailed() {

  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Payment Failed ❌
      </h1>

      <p className="mb-6">
        Something went wrong with your payment.
      </p>

      <Link
        to="/checkout"
        className="bg-black text-white px-6 py-3 rounded-lg"
      >
        Try Again
      </Link>

    </div>

  );

}

export default PaymentFailed;
