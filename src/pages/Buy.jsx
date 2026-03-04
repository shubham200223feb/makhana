import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchCart = async () => {
    try {
      const res = await axios.post(
        "https://makhanabackend.onrender.com/api/cart/findproduct",
        {},
        { withCredentials: true }
      );

      if (!res.data.sucess) {
        setItems([]);
        setLoading(false);
        return toast.info(res.data.message);
      }

      const { url, name, price } = res.data;

      const finalList = url.map((u, i) => ({
        url: url[i],
        name: name[i],
        price: price[i],
      }));
      console.log(finalList);

      setItems(finalList);
      setLoading(false);
    } catch (err) {
      console.log("Error while loading cart", err);
      toast.error("Server error while loading cart");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  
  const deleteItem = async (productname) => {
    try {
      const res = await axios.post(
        "https://makhanabackend.onrender.com/api/cart/delete",
        { productname },
        { withCredentials: true }
      );

      if (res.data.sucess) {
        toast.success("Item removed");
        fetchCart(); 
      } else {
        toast.error("Error while deleting");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error deleting product");
    }
  };

  
  
  const buyNow = () => {
    toast.success("Order Placed Successfully!");
  };

  return (
    <div className="w-full min-h-screen p-5 bg-gray-100">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>

      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-xl text-gray-600">Cart is empty! Add items first.</p>
      ) : (
        <>
          {/* PRODUCT LIST */}
          <div className="flex flex-col gap-4">
            {items.map((item, i) => (
              <div
                key={i}
                className="w-full bg-white p-4 rounded-xl shadow flex items-center justify-between"
              >
                {/* Image */}
                <img
                  src={item.url}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                {/* name + price */}
                <div className="flex flex-col w-[50%]">
                  <p className="text-lg font-semibold">{item.name}</p>
                  <p className="text-gray-600">₹ {item.price}</p>
                </div>

                {/* Delete button */}
                <button
                  className="text-red-600 text-3xl"
                  onClick={() => deleteItem(item.name)}
                >
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>

          {/* BUY BUTTON */}
          <div className="mt-6 w-full flex justify-center">
            <button
              onClick={buyNow}
              className="bg-green-600 px-6 py-3 text-white rounded-xl text-xl hover:bg-green-700 transition"
            >
              BUY NOW
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;