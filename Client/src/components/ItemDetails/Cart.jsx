import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import {
  Header,
  Footer,
  Loading,
  Button,
  Message,
  DropdownContainer,
  HeroSection,
} from "../Components";
import { useLocation } from "react-router-dom";
import { BestSellers, SectionTitle as Title, Resp } from "../Components";
import "./cart.scss"

const Cart = () => {

  return (
    <>
      <Header />
      <HeroSection className="Container_OnlyTitle" BgClass="Cart_Hero"/>
      <CartSection/>
      <Footer />
    </>
  );
};

export default Cart;

const CartSection = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [shippingAddress, setShippingAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart");
      setCartItems(data.cartItems || []);
      setTotalPrice(data.totalPrice || 0);
    } catch (err) {
      console.error("Помилка при завантаженні кошика:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1 || newQuantity > 99) return;
    try {
      await axiosInstance.patch(`/cart?productId=${productId}&newQuantity=${newQuantity}`);
      fetchCart();
    } catch (err) {
      console.error("Помилка при зміні кількості:", err);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axiosInstance.delete(`/cart?productId=${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Помилка при видаленні товару:", err);
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/auth/me")
      .then((res) => {
        const { fullName, email, phoneNumber } = res.data;
        setUserData({ fullName, email, phoneNumber: phoneNumber ?? "" });
      })
      .catch((err) => {
        console.error("Помилка при отриманні користувача:", err);
      });
  }, []);

  const containers = [
    {
      title: "ПІБ",
      children: (
        <input
          className="input"
          type="text"
          value={userData.fullName}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
        />
      ),
    },
    {
      title: "Email",
      children: (
        <input
          className="input"
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
      ),
    },
    {
      title: "Номер телефону",
      children: (
        <input
          className="input"
          type="tel"
          value={userData.phoneNumber}
          onChange={(e) =>
            setUserData({ ...userData, phoneNumber: e.target.value })
          }
        />
      ),
    },
    {
      title: "Адреса доставки",
      children: (
        <input
          className="input"
          type="text"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        />
      ),
    },
  ];

  return (
    <section className="cart-section">
      <Title title="Дані для замовлення">{null}</Title>
      <div className="container">  
        <div className="user-data cart_part">          
          <div className="data">
            {containers.map((c, index) => (
              <div className="inputbox">
                <label className="input-title">{c.title}</label>
                <div>{c.children}</div>                
              </div>
            ))}
          </div>
        </div>
        <div className="cart-items cart_part">
          <Title title="Товари у кошику">{null}</Title>
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <img src={item.imageLink} alt={item.productName} width="80" />
                <div>
                  <p><strong>{item.productName}</strong></p>
                  <p>Розмір: {item.size ?? "—"}</p>
                  <p>Ціна за штуку: {item.priceForUnit} грн</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>+</button>
                    <button onClick={() => handleDelete(item.productId)} style={{ color: "red"}}>
                    ❌ Видалити
                  </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Кошик порожній 🛒</p>
          )}
          <h3>Загальна сума: {totalPrice} грн</h3>
        </div>
      </div>
      <BestSellers />
    </section>
  );
};

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
