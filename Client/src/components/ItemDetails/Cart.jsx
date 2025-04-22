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

const CartSection = ({ product, quantity, sizeIdx }) => {
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

  console.log(product.name, sizeIdx, quantity);
  return (
    <div>
      <h2>Cart</h2>
      <p>Item: {product.name}</p>
      <p>Size: {sizeIdx}</p>
      <p>Count: {quantity}</p>
    </div>
  );
};
