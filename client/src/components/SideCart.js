import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function SideCart({ isOpen, setIsOpen }) {

  const { cartItems, total, removeFromCart, increaseQty, decreaseQty } = useCart();

  return (
    <>
      {/* Background Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}

      {/* Side Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 p-6"
      >
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length === 0 && (
          <p className="text-gray-600">Cart is empty</p>
        )}

        <div className="space-y-4">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-3"
            >

              {/* LEFT SIDE - IMAGE + INFO */}
              <div className="flex items-center gap-3">

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 object-cover rounded-lg"
                />

                <div>
                  <h3 className="font-semibold">{item.name}</h3>

                  <p className="text-gray-600 text-sm">
                    ₹{item.price}
                  </p>

                  {/* Quantity Buttons */}
                  <div className="flex items-center gap-2 mt-2">

                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="px-2 bg-gray-200 rounded"
                    >
                      +
                    </button>

                  </div>
                </div>

              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>

            </div>
          ))}

        </div>

        {/* TOTAL + CHECKOUT */}
        <div className="mt-8 border-t pt-4">
          <p className="flex justify-between font-semibold">
            <span>Total</span>
            <span>₹{total}</span>
          </p>

          <Link
            to="/checkout"
            className="block bg-black text-white text-center py-3 rounded-lg mt-4"
          >
            Checkout
          </Link>
        </div>

      </motion.div>
    </>
  );
}

export default SideCart;
