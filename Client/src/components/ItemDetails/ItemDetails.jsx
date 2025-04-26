import { useNavigate, useParams } from "react-router-dom";
import {
  Header,
  Footer,
  BestSellers,
  Loading,
  Button,
  Message,
} from "../Components";
import Item from "../Items/Item";
import "./ItemDetails.scss";
import titleClasses from "../SectionTitle/SectionTitle.module.scss";
import { useState } from "react";
import axiosInstance from "../AxiosInstance";
import useProductById from "./useProductById";

const ITemDetails = () => {
  return (
    <>
      <Header />
      <ItemContainer />
      <BestSellers />
      <Footer />
    </>
  );
};
export default ITemDetails;

const ItemContainer = () => {
  const { id } = useParams();
  const { product, loading, error } = useProductById(id);

  if (loading) return <Loading />;
  if (error || !product) return <p className="error">Не знайдено товар 🤷‍♂️</p>;

  return (
    <section className="Item_details">
      <div className="details_wrap">
        <ItemPhotos item={product} />
        <ItemDescription item={product} />
      </div>
    </section>
  );
};

const ItemPhotos = ({ item }) => {
  const otherPhotos = item.otherPhotos ?? [];
  const [mainPhoto, setMainPhoto] = useState(item.imageLink);

  return (
    <div className="photos_frame">
      <div className="preview">
        <Item {...item} preview={mainPhoto} />
      </div>

      {/* <div className="other_photos">
        <img
          src={item.imageLink}
          alt="main"
          onClick={() => setMainPhoto(item.imageLink)}
        />
        {otherPhotos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt={i}
            onClick={() => setMainPhoto(photo)}
          />
        ))}
      </div> */}
    </div>
  );
};

const ItemDescription = ({ item }) => {
  console.log(item);
  const sizeCodes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
  const sizeTitles = [
    "Малий",
    "Середній",
    "Великий",
    "Extra Великий",
    "2 Extra Великий",
    "3 Extra Великий",
    "4 Extra Великий",
  ];

  const available = item.supportsSizes ? item.availableSizes.map(Number) : [];

  const [selected, setSelected] = useState(null);

  return (
    <div className="description_frame">
      <div className="container">
        <div className="main_item_content">
          <Item {...item} />
          <div className={`${titleClasses.arrow} arrow`}></div>

          {item.supportsSizes ? (
            <div className="sizelist">
              <div className="current_size">
                <span className="System S12_L20 UpC"> розмір: </span>
                <span className="p2">
                  {selected != null ? sizeTitles[selected] : "—"}
                </span>
              </div>
              <div className="size_buttons">
                {sizeCodes.map((code, idx) => {
                  const disabled = !available.includes(idx);
                  return (
                    <Button
                      key={code}
                      className={`${disabled ? "sold" : ""} ${
                        selected === idx ? "clicked" : ""
                      }`}
                      Onclick={disabled ? null : () => setSelected(idx)}
                    >
                      {code}
                    </Button>
                  );
                })}
              </div>
            </div>
          ) : null}
          <div className={`${titleClasses.arrow} arrow`}></div>
          <AddToCard
            item={item}
            sizeIdx={selected}
            sizeCode={sizeCodes[selected]}
          />
        </div>
        <div className="details">
          <Details {...item} />
        </div>
      </div>
    </div>
  );
};

const AddToCard = ({ item, sizeIdx, sizeCode }) => {
  const [count, setCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const navigate = useNavigate();

  const changeCount = (delta) =>
    setCount((c) => Math.min(99, Math.max(1, c + delta)));

  const handleAddToCart = async () => {
    if (item.supportsSizes && sizeIdx == null) return;
    console.log(item.id, count, item.supportsSizes ? sizeIdx : null);

    try {
      await axiosInstance.post("/cart", {
        productId: item.id,
        quantity: count,
        size: item.supportsSizes ? sizeIdx : null,
      });

      navigate("/cart", {
        state: {
          product: item,
          quantity: count,
          sizeIdx: item.supportsSizes ? sizeCode : null,
        },
      });
    } catch (err) {
      console.error("Add‑to‑cart error:", err);
      setModalText("❌ Failed to add item. Try again!");
      setModalOpen(true);
    }
  };

  return (
    <div className="addToCard">
      <div className="buttons_wrap">
        <div className={`items_count ${count === 1 ? `disabled` : ""}`}>
          <button
            className={`change_count S24_L32 ${count > 1 ? "" : "disabled"}`}
            onClick={() => changeCount(-1)}
            disabled={count === 1}
          >
            -
          </button>
          <p className="p2">{count}</p>
          <button
            className={`change_count S24_L32 ${count < 99 ? "" : "disabled"}`}
            onClick={() => changeCount(+1)}
            disabled={count === 99}
          >
            +
          </button>
        </div>
        <Button
          Onclick={handleAddToCart}
          className={`${
            item.supportsSizes && sizeIdx == null ? "disabled" : ""
          }`}
        >
          {item.supportsSizes && sizeIdx == null
            ? "Оберіть розмір"
            : "До кошика"}
        </Button>
        <Message
          open={modalOpen}
          duration={3000}
          onClose={() => setModalOpen(false)}
          type="item_submit"
        >
          {modalText}
        </Message>
      </div>
    </div>
  );
};

const Details = (item) => {
  const [openedDiv, setOpenedDiv] = useState(1);
  const description = (item.description || "").split("\n").filter(Boolean);
  const features = (item.features || "").split("\n").filter(Boolean);

  const toggleOpenedDiv = (number) => {
    setOpenedDiv(number === openedDiv ? null : number);
  };

  return (
    <div className="dropdown_container">
      <DropDown
        IsOpened={openedDiv === 1}
        title="Опис"
        OnClick={() => toggleOpenedDiv(1)}
      >
        {description.map((paragraph, index) => (
          <p key={index} className="p2">
            {paragraph}
          </p>
        ))}
      </DropDown>
      <DropDown
        IsOpened={openedDiv === 2}
        title="Особливості товару"
        OnClick={() => toggleOpenedDiv(2)}
      >
        <ul>
          {features.map((feture, index) =>
            index === 0 ? (
              <p key={index} className="p2">
                {feture}
              </p>
            ) : (
              <li className="p2" key={index}>
                {feture}
              </li>
            )
          )}
        </ul>
      </DropDown>
    </div>
  );
};

const DropDown = ({ IsOpened, title, children, OnClick }) => {
  return (
    <div className="dropdown">
      <div className="head" onClick={OnClick}>
        <p className="p2">{title}</p>
        <div className={`dropdown_arrow ${IsOpened ? "rotated" : ""}`}></div>
      </div>
      <div className={`content ${IsOpened ? "" : "closed"}`}>{children}</div>
    </div>
  );
};
