import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import Wishlist from "./pages/Wishlist";
import { WishlistProvider } from "./context/WishlistContext";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import UserDashboard from "./pages/UserDashboard";

import productsData from "./data/productsData";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Help from "./pages/Help";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Footer from "./components/Footer";

function App() {

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <WishlistProvider>
    <CartProvider>
      <BrowserRouter>

        <Navbar wishlist={wishlist} />

        <div className="min-h-screen bg-gray-100">

          <Routes>

            <Route path="/" element={<Home />} />

            <Route
              path="/products"
              element={<Products wishlist={wishlist} setWishlist={setWishlist} />}
            />

            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/cart" element={<Cart />} />

            <Route path="/checkout" element={<Checkout />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/order-success" element={<OrderSuccess />} />
              
            <Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-failed" element={<PaymentFailed />} />

            <Route
              path="/wishlist"
              element={<Wishlist wishlist={wishlist} products={productsData} />}
            />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            {/* NEW ROUTES */}

            <Route path="/admin-dashboard" element={<AdminDashboard />} />
             
            <Route path="/admin-orders" element={<AdminOrders/>} />

            <Route path="/user-dashboard" element={<UserDashboard />} />

            <Route path="/about" element={<About />} />
<Route path="/careers" element={<Careers />} />
<Route path="/blog" element={<Blog />} />
<Route path="/help" element={<Help />} />
<Route path="/terms" element={<Terms />} />
<Route path="/privacy" element={<Privacy />} />

          </Routes>

          <Footer />

        </div>

      </BrowserRouter>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;

