import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function Home() {
  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <div className="h-[90vh] flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">

        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Rent Smarter <br /> Live Better
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Affordable furniture & appliances delivered to your doorstep.
          </p>

          <Link
to="/products"
className="bg-black text-white px-6 py-3 rounded-full"
>
Explore Rentals
</Link>
        </div>

        {/* Right Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc"
          alt="Furniture"
          className="md:w-1/2 rounded-2xl shadow-xl mt-10 md:mt-0"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
      <br></br>
      <br></br>

      {/* HOW IT WORKS */}
      <div className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

          <div>
            <h3 className="text-xl font-semibold mb-3">1. Choose Product</h3>
            <p className="text-gray-600">
              Browse furniture & appliances that fit your needs.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">2. Schedule Delivery</h3>
            <p className="text-gray-600">
              Select your rental tenure and delivery date.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">3. Enjoy & Return</h3>
            <p className="text-gray-600">
              Use during tenure and extend or return easily.
            </p>
          </div>

        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 bg-white text-center"
      >
        <h2 className="text-3xl font-bold mb-12">Featured Rentals</h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <img
              src="https://p.rmjo.in/productSquare/p7zyrfjx-500x500.webp"
              alt="Sofa"
              className="rounded-2xl mb-4 h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-xl font-semibold">Modern Sofa</h3>
            <p className="text-gray-600 mb-4">₹1500 / month</p>
            <button className="bg-black text-white px-5 py-2 rounded-full hover:scale-105 transition">
              Rent Now
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <img
              src="https://images.unsplash.com/photo-1615874959474-d609969a20ed"
              alt="Bed"
              className="rounded-2xl mb-4 h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-xl font-semibold">Double Bed</h3>
            <p className="text-gray-600 mb-4">₹1200 / month</p>
            <button className="bg-black text-white px-5 py-2 rounded-full hover:scale-105 transition">
              Rent Now
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <img
              src="https://p.rmjo.in/productSquare/9l42gmid-500x500.webp"
              alt="Fridge"
              className="rounded-2xl mb-4 h-56 w-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <h3 className="text-xl font-semibold">Refrigerator</h3>
            <p className="text-gray-600 mb-4">₹1800 / month</p>
            <button className="bg-black text-white px-5 py-2 rounded-full hover:scale-105 transition">
              Rent Now
            </button>
          </div>

        </div>
      </motion.div>

    </div>
  );
}

export default Home;
