import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import SideCart from "./SideCart";

function Navbar() {

  const { cartItems } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handlelogout = () =>{

localStorage.removeItem("token");
localStorage.removeItem("userEmail");
localStorage.removeItem("user");

window.location.href="/login";

}
  // 🔔 Wishlist count update
  useEffect(() => {

    const updateWishlist = () => {

      const saved = JSON.parse(localStorage.getItem("wishlist")) || [];

      setWishlistCount(saved.length);

    };

    updateWishlist();

    window.addEventListener("wishlistUpdated", updateWishlist);

    return () =>
      window.removeEventListener("wishlistUpdated", updateWishlist);

  }, []);

  return (
    <>
    
    <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm px-10 py-4 flex justify-between items-center z-50">

      <Link to="/" className="text-xl font-bold">
        RentEase
      </Link>

      <div className="space-x-6 flex items-center">

        <Link to="/" className="hover:text-gray-600">
          Home
        </Link>

        <Link to="/products" className="hover:text-gray-600">
          Products
        </Link>

        {/* Cart Button */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative hover:text-gray-600"
        >
          Cart

          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
          )}

        </button>

        {/* ❤️ Wishlist */}
        <Link to="/wishlist">
          ❤️ Wishlist ({wishlistCount})
        </Link>

        <Link to="/orders">Orders</Link>

        {token ? (
  <>
    <span className="font-semibold text-green-600">
      👤 {user?.name}
    </span>

    <button 
      onClick={handlelogout}
      className="ml-2"
    >
      Logout
    </button>
  </>
) : (
  <Link to="/login">Login</Link>
)}

        <Link
          to="/register"
          className="bg-black text-white px-4 py-2 rounded-lg hover:scale-105 transition"
        >
          Sign Up
        </Link>

      </div>

    </nav>

    {/* 🔥 Side Cart Drawer */}
    <SideCart isOpen={cartOpen} setIsOpen={setCartOpen} />

    </>
  );
}

export default Navbar;
