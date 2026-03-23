import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Products({ wishlist, setWishlist }) {

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [quickView, setQuickView] = useState(null);
  const [products, setProducts] = useState([]);

  // 🔗 Fetch products from backend
  useEffect(() => {
    fetch("https://rentease-backend-hv56.onrender.com/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // ❤️ Load wishlist from localStorage
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");

const savedWishlist =
JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || [];

    setWishlist(savedWishlist);
  }, [setWishlist]);

  // ❤️ Wishlist toggle
  const toggleWishlist = (product) => {

  const userEmail = localStorage.getItem("userEmail");

  const existing =
    JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || [];

  const exists =
    existing.find((item)=>item._id === product._id);

  let updatedWishlist;

  if(exists){
    updatedWishlist =
      existing.filter((item)=>item._id !== product._id);
  }else{
    updatedWishlist = [...existing, product];
  }

  setWishlist(updatedWishlist);

  localStorage.setItem(
    `wishlist_${userEmail}`,
    JSON.stringify(updatedWishlist)
  );

  window.dispatchEvent(new Event("wishlistUpdated"));

};

  // 🔍 Filter logic
  const filteredProducts = products
    .filter((product) =>
      product.name?.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      category === "All" ? true : product.category === category
    );

  if (sort === "low") {
    filteredProducts.sort((a, b) => a.rent - b.rent);
  }

  if (sort === "high") {
    filteredProducts.sort((a, b) => b.rent - a.rent);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-10">
          Explore Our Rentals
        </h1>

        {/* 🔍 Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="border p-3 rounded-lg w-full mb-10"
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 💰 Sort */}
        <select
          onChange={(e) => setSort(e.target.value)}
          className="border p-3 rounded-lg mb-10"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>

        {/* Category Filters */}
        <div className="flex justify-center gap-6 mb-12">
          {["All", "Furniture", "Appliances"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full transition ${
                category === cat
                  ? "bg-black text-white"
                  : "bg-white shadow hover:shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div layout className="grid md:grid-cols-3 gap-10">

          {filteredProducts.map((product) => (

            <motion.div
              key={product._id}
              layout
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl shadow-md overflow-hidden"
            >

              <div className="relative">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-64 w-full object-cover transition-transform duration-300 hover:scale-110"
                />

                {/* 💰 Price */}
                <span className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1 rounded-full">
                  ₹{product.rent}/mo
                </span>

                {/* ❤️ Wishlist */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 text-2xl"
                >
                  {wishlist.some((item) => item._id === product._id) ? "❤️" : "🤍"}
                </button>

              </div>

              <div className="p-6">

                <h2 className="text-xl font-semibold mb-2">
                  {product.name}
                </h2>

                {/* 🔍 Quick View */}
                <button
                  onClick={() => setQuickView(product)}
                  className="w-full border py-2 rounded-full mb-2 hover:bg-gray-100"
                >
                  Quick View
                </button>

                {/* 👁 View Details */}
                <Link to={`/product/${product._id}`}>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="w-full bg-black text-white py-2 rounded-full"
                  >
                    View Details
                  </motion.button>
                </Link>

              </div>

            </motion.div>
          ))}

        </motion.div>

      </div>

      {/* 🔍 Quick View Popup */}
      {quickView && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white p-8 rounded-xl max-w-md w-full relative">

            <button
              onClick={() => setQuickView(null)}
              className="absolute top-3 right-3 text-xl"
            >
              ✖
            </button>

            <img
              src={quickView.image}
              alt={quickView.name}
              className="h-60 w-full object-cover mb-4 rounded"
            />

            <h2 className="text-2xl font-bold mb-2">
              {quickView.name}
            </h2>

            <p className="text-yellow-500">
              ⭐ {quickView.rating || "4.5"}
            </p>

            <p className="text-gray-600 mb-4">
              ₹{quickView.rent} / month
            </p>

            <Link to={`/product/${quickView._id}`}>
              <button className="w-full bg-black text-white py-2 rounded-full">
                View Full Details
              </button>
            </Link>

          </div>

        </div>

      )}

    </div>
  );
}

export default Products;
