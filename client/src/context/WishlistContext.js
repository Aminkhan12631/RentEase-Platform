import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {

  // LOAD WISHLIST FROM LOCALSTORAGE (USER WISE)
  const [wishlistItems, setWishlistItems] = useState(() => {

    const userEmail = localStorage.getItem("userEmail");

    const savedWishlist = localStorage.getItem(`wishlist_${userEmail}`);

    return savedWishlist ? JSON.parse(savedWishlist) : [];

  });

  // SAVE WISHLIST
  useEffect(() => {

    const userEmail = localStorage.getItem("userEmail");

    if(userEmail){
      localStorage.setItem(
        `wishlist_${userEmail}`,
        JSON.stringify(wishlistItems)
      );
    }

  }, [wishlistItems]);

  // ADD TO WISHLIST
  const addToWishlist = (product) => {

    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if(!exists){
      setWishlistItems([...wishlistItems, product]);
    }

  };

  // REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {

    setWishlistItems(
      wishlistItems.filter((item) => item.id !== id)
    );

  };

  return (

    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist
      }}
    >

      {children}

    </WishlistContext.Provider>

  );

};
