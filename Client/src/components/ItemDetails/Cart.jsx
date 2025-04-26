import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import { Header, Footer, Button, Message, HeroSection } from "../Components";
import { BestSellers, SectionTitle as Title, Resp } from "../Components";
import "./cart.scss";

const Cart = () => {
  return (
    <>
      <Header />
      <HeroSection className="Container_OnlyTitle" BgClass="Cart_Hero" />
      <CartSection />
      <BestSellers />
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

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
      await axiosInstance.patch(
        `/cart?productId=${productId}&newQuantity=${newQuantity}`
      );
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
          required
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
          required
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
          required
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
          required
        />
      ),
    },
  ];

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/order", {
        shippingAddress,
      });
      setModalText("Замовлення підтверджено ✅");
      setModalOpen(true);
    } catch (err) {
      console.error("Помилка при створенні замовлення:", err);
      setModalText("Помилка при оформленні замовлення ❌");
      setModalOpen(true);
    }
  };

  const closeMessage = () => {
    setModalOpen(false);
  };

  const sizeMap = {
    1: "S",
    2: "M",
    3: "L",
    4: "XL",
    5: "2XL",
    6: "3XL",
  };

  return (
    <section className="cart-section">
      <Title title="Дані для замовлення">{null}</Title>
      <div className="container">
        <div className="user-data cart_part">
          <form className="data" onSubmit={handleSubmitOrder}>
            {containers.map((c, index) => (
              <div className="inputbox" key={index}>
                <label className="input-title p1">{c.title}</label>
                <div>{c.children}</div>
              </div>
            ))}
            <Button Width="100%" type="submit">
              Підтвердити замовлення
            </Button>
          </form>
        </div>
        <div className="cart-items cart_part">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.imageLink} alt={item.productName} width="80" />
                <div>
                  <p className="p2 bold">{item.productName}</p>
                  <p className="p2">Розмір: {sizeMap[item.size] ?? "—"}</p>
                  <p className="p2">Ціна за штуку: {item.priceForUnit} грн</p>
                  <div className="order_product_buttons">
                    <div className="product_count">
                      <button
                        className="p1"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity - 1
                          )
                        }
                      >
                        -
                      </button>
                      <span className="p1">{item.quantity}</span>
                      <button
                        className="p1"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="delete_button p1"
                      onClick={() => handleDelete(item.productId)}
                    >
                      Видалити
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Кошик порожній 🛒</p>
          )}
          <h3 className="System S18_L26">Загальна сума: {totalPrice} грн</h3>
        </div>
      </div>
      <Message
        open={modalOpen}
        duration={2000}
        onClose={closeMessage}
        type="item_submit"
      >
        {modalText}
      </Message>    
    </section>
  );
};
