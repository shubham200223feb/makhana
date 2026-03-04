import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Navbar from "../components/Navbar";
import { data, Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const[total,setTotal]=useState(0);

  useEffect(()=>{
setTotal((t)=>{
  let sum=0;
  items.forEach((item)=>{
    sum+=(item.price*item.itemnumber)
  })
  return sum;
})
  },[items])
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

      const { url, name, price,itemnumber } = res.data;

      const finalList = url.map((u, i) => ({
        url: url[i],
        name: name[i],
        price: price[i],
        itemnumber:itemnumber[i],

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
        console.log(res.data);
        toast.success(data.email||"Item removed");
        console.log(productname)
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
    <div>
     <Navbar className="mb-96"/>
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
                  <p className="text-gray-600">₹ {item.price *item.itemnumber}</p>
                </div>

                {/* Delete button */}
                <div className="flex flex-col items-center gap-2.5">
                  <button
                  className="text-red-600 text-3xl"
                  onClick={() => deleteItem(item.name)}
                >
                  <MdDelete />
                </button>
                <Link className="bg-amber-50 hover:bg-amber-100 text-blue-50 shadow-2xl" to={"/product"}>Update Quantiy</Link>
                </div>
                
              </div>
            ))}
          </div>

          {/* BUY BUTTON */}
          <div className="mt-6 w-full flex items-center justify-between ">
            <button
              onClick={buyNow}
              className=" bg-blue-400 px-6 py-3 text-blue-50 rounded-xl text-xl hover:bg-blue-600 transition flex-col justify-between"
            >
              <p>Amount To Pay  </p>
              <p>₹ {total}</p>

            </button>
            <button
              onClick={buyNow}
              className="bg-blue-400 px-6 py-3 text-blue-50 rounded-xl text-xl hover:bg-blue-600 transition"
            >
              Pay Now
            </button>
          </div>
        </>
      )}
    </div></div>
  );
};

export default Cart;