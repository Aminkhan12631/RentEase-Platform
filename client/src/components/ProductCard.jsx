import "../styles/ProductCard.css";
import { useState, useEffect } from "react";

function ProductCard({ product }) {

  const [liked, setLiked] = useState(false);

  useEffect(()=>{

    const userEmail = localStorage.getItem("userEmail");

    const existing =
      JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || [];

    const exists = existing.find((item)=>item._id === product._id);

    if(exists){
      setLiked(true);
    }

  },[product]);

  const addToWishlist = () => {

    const userEmail = localStorage.getItem("userEmail");

    const existing =
      JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || [];

    const exists = existing.find((item)=>item._id === product._id);

    let updated;

    if(exists){
      updated = existing.filter((item)=>item._id !== product._id);
      setLiked(false);
    }else{
      updated = [...existing, product];
      setLiked(true);
      alert("Added to wishlist ❤️");
    }

    localStorage.setItem(
      `wishlist_${userEmail}`,
      JSON.stringify(updated)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));

  };

  return (

    <div className="product-card">

      <div
        className="wishlist-btn"
        onClick={addToWishlist}
      >
        {liked ? "❤️" : "🤍"}
      </div>

      <img src={product.image} alt={product.name} />

      <h3>{product.name}</h3>

      <p>₹{product.rent}</p>

    </div>

  );
}

export default ProductCard;
