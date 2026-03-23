import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function ProductDetail() {

  const { addToCart } = useCart();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [duration, setDuration] = useState(3);

  useEffect(() => {

    fetch(`https://rentease-backend.onrender.com/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setSelectedImage(data.image);
      })
      .catch((err) => console.log(err));

  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Loading Product...</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">

        {/* LEFT IMAGE */}
        <div>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full rounded-3xl shadow-lg mb-6"
          />

        </div>

        {/* RIGHT INFO */}
        <div>

          <h1 className="text-4xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold mb-6">
            ₹{product.rent} / month
          </p>

          {/* Rental Duration */}
          <h3 className="text-lg font-semibold mb-3">
            Select Rental Duration
          </h3>

          <div className="flex gap-4 mb-6">

            {[3,6,12].map((t) => (
              <button
                key={t}
                onClick={() => setDuration(t)}
                className={`px-4 py-2 rounded ${
                  duration === t ? "bg-black text-white" : "bg-gray-200"
                }`}
              >
                {t} Months
              </button>
            ))}

          </div>

          <p className="text-xl font-bold mb-6">
            Total Price: ₹{product.rent * duration}
          </p>

          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          <p className="mb-6 font-semibold">
            Deposit: ₹{product.deposit}
          </p>

          {/* ADD TO CART */}
          <button
            onClick={() =>
              addToCart({
                id: product._id,
                name: product.name,
                price: product.rent,
                deposit: product.deposit,
                image: product.image,
                duration: duration
              })
            }
            className="w-full bg-black text-white py-4 rounded-full hover:scale-105 transition"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;
