import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [Results, setResults] = useState(null)


async function getCart() {
  try {
    let res = await axios.get("https://fit-app-pink-omega.vercel.app/api/v1/carts",{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    });

    setCart(res?.data?.data?.cart?.items || []);
    console.log(res.data.data,"results")
    setResults(res.data.results)
  } catch (err) {
    if(err.response && err.response.status === 404){
      // كارت فاضي أو مش موجود
      setCart([]);
    } else {
      console.log(err);
    }
  }
}

useEffect(() => {
  getCart()
  

  return () => {
    
  }
}, [])





async function DeleteFromCart(id) {
  try {
    const res = await axios.delete(
      `https://fit-app-pink-omega.vercel.app/api/v1/carts/${id}/all`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("✅ Added to cart:", res.data);
     getCart()
     toast.success("Removed From Cart");
  
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
        getCart(null)
  }
}

  return (
    <CartContext.Provider value={{ cart, getCart, DeleteFromCart,Results,setResults,setCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
