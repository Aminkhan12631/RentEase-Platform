import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Wishlist() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(()=>{

    const userEmail = localStorage.getItem("userEmail");

    const savedWishlist =
      JSON.parse(localStorage.getItem(`wishlist_${userEmail}`)) || [];

    setWishlist(savedWishlist);

  },[]);

  const removeFromWishlist = (id) => {

    const userEmail = localStorage.getItem("userEmail");

    const updatedWishlist =
      wishlist.filter((item)=>item._id !== id);

    setWishlist(updatedWishlist);

    localStorage.setItem(
      `wishlist_${userEmail}`,
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(new Event("wishlistUpdated"));

  };

  return (

    <div className="min-h-screen bg-gray-100 py-16">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10 text-center">
          ❤️ Your Wishlist
        </h1>

        <div className="grid grid-cols-3 gap-6">

          {wishlist.map((item)=>(
            
            <div key={item._id} className="bg-white p-4 rounded-xl shadow">

              <img
                src={item.image}
                alt={item.name}
                className="rounded-lg mb-4"
              />

              <h2 className="text-lg font-semibold">
                {item.name}
              </h2>

              <p>₹{item.rent} / month</p>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={()=>removeFromWishlist(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  ❤️ Remove
                </button>

                <Link to={`/product/${item._id}`}>
                  <button className="bg-black text-white px-3 py-1 rounded">
                    👁 View Product
                  </button>
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Wishlist;
