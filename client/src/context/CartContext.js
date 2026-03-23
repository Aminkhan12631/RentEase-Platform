import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {

  // LOAD CART FROM LOCALSTORAGE (USER WISE)
  const [cartItems, setCartItems] = useState(() => {
    const userEmail = localStorage.getItem("userEmail");
    const savedCart = localStorage.getItem(`cart_${userEmail}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // SAVE CART WHEN IT CHANGES
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if(userEmail){
      localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    );

    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } 
    else {
      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
          duration: product.duration || 3
        }
      ]);
    }
  };

  // REMOVE
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // INCREASE
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // TOTAL
  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.price || 0) * item.duration * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
