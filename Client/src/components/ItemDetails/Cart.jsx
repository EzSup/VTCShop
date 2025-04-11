import { useState } from "react";
import axiosInstance from "../AxiosInstance";
import { Header, Footer, Loading, Button, Message } from "../Components";
import { useLocation } from "react-router-dom";

const Cart = () => {
  const { state } = useLocation();

  return (
    <>
      <Header />
      <CartSection {...state} />
      <Footer />
    </>
  );
};

export default Cart;

const CartSection = ({ item, size, count }) => {
  /*const handleRemoveFromCart = async () => {
    await axiosInstance
      .delete(`/cart?productId=${item.id}`)
      .then(() => {
        setCount(1);
        setModalText("🗑️ Item removed from cart!");
        setModalOpen(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };*/

  console.log(item, size, count);
  return (
    <div>
      <h2>Cart</h2>
      <p>Item: {item.id}</p>
      <p>Size: {size}</p>
      <p>Count: {count}</p>
    </div>
  );
};
