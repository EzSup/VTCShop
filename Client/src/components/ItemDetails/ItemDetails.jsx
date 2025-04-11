import { useNavigate, useParams } from "react-router-dom";
import {
  Header,
  Footer,
  BestSellers,
  Loading,
  Button,
  Message,
} from "../Components";
import GetData from "../GetData";
import Item from "../Items/Item";
import "./ItemDetails.scss";
import titleClasses from "../SectionTitle/SectionTitle.module.scss";
import { useState } from "react";
import axiosInstance from "../AxiosInstance";

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
  const { items, loading } = GetData({ name: "items", id });

  if (loading || !items.length) return <Loading />;

  const item = items[0];

  return (
    <section className="Item_details">
      <div className="details_wrap">
        <ItemPhotos item={item} />
        <ItemDescription item={item} />
      </div>
    </section>
  );
};

const ItemPhotos = ({ item }) => {
  const OtherProtos = item.otherPhotos;
  const [MainPhoto, SetMainPhoto] = useState(item.preview);

  return (
    <div className="photos_frame">
      <div className="preview">
        <Item {...item} preview={MainPhoto} />
      </div>
      <div className="other_photos">
        <img
          alt="main"
          src={`${item.preview}`}
          onClick={() => SetMainPhoto(item.preview)}
        />
        {OtherProtos.map((photo, index) => (
          <img
            alt={index}
            src={`${photo}`}
            key={index}
            onClick={() => SetMainPhoto(photo)}
          />
        ))}
      </div>
    </div>
  );
};

const ItemDescription = ({ item }) => {
  const Sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];
  const SizeTitles = [
    "Small",
    "Medium",
    "Large",
    "Extra Large",
    "Extra Extra Large",
    "3 Extra Large",
    "4 Extra Large",
  ];
  const [selectedSize, setSelectedSize] = useState(null);

  const handleButtonClick = (size) => {
    setSelectedSize(size);
  };

  const selectedSizeTitle = selectedSize
    ? SizeTitles[Sizes.indexOf(selectedSize)]
    : null;

  return (
    <div className="description_frame">
      <div className="container">
        <div className="main_item_content">
          <Item {...item} />
          <div className={`${titleClasses.arrow} arrow`}></div>
          <div className="sizelist">
            <div className="current_size">
              <span className="System S12_L20 UpC"> size: </span>
              <span className="p2">{selectedSizeTitle}</span>
            </div>
            <div className="size_buttons">
              {Sizes.map((size) => (
                <Button
                  key={size}
                  className={`${!item.sizes.includes(size) ? "sold" : ""} ${
                    selectedSize === size ? "clicked" : ""
                  }`}
                  Onclick={
                    !item.sizes.includes(size)
                      ? null
                      : () => handleButtonClick(size)
                  }
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          <div className={`${titleClasses.arrow} arrow`}></div>
          <AddToCard item={item} size={selectedSize} />
        </div>
        <div className="details">
          <Details {...item} />
        </div>
      </div>
    </div>
  );
};

const AddToCard = ({ item, size }) => {
  const [count, setCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!size) return;
    navigate("/cart", {
      state: {
        item,
        size,
        count,
      },
    });
    /*const data = await axiosInstance
      .post("/cart", {
        productId: item.id,
        quantity: count,
      })
      .then(() => {
        setModalText("✅ Item added to cart!");
        setModalOpen(true);
        navigate("/Cart", {
          state: {
            item,
            size,
            count,
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);*/
  };

  const handleUpdateQuantity = async (newCount) => {
    if (newCount < 1 || newCount > 99) {
      return;
    }
    await axiosInstance
      .patch(`/cart?productId=${item.id}&newQuantity=${newCount}`)
      .then(() => {
        setCount(newCount);
      });
  };

  return (
    <div className="addToCard">
      <div className="buttons_wrap">
        <div className={`items_count ${count === 1 ? `disabled` : ""}`}>
          <button
            className={`change_count S24_L32 ${count > 1 ? "" : "disabled"}`}
            onClick={count >= 1 ? () => handleUpdateQuantity(count - 1) : null}
          >
            -
          </button>
          <p className="p2">{count}</p>
          <button
            className={`change_count S24_L32 ${count < 99 ? "" : "disabled"}`}
            onClick={count <= 99 ? () => handleUpdateQuantity(count + 1) : null}
          >
            +
          </button>
        </div>
        <Button
          Onclick={handleAddToCart}
          className={`${!size ? "disabled" : ""}`}
        >
          {!size ? "Select the Size" : "Add to Cart"}
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
  const description = item.description.split("\n").filter(Boolean);
  const features = item.features.split("\n").filter(Boolean);

  const toggleOpenedDiv = (number) => {
    setOpenedDiv(number === openedDiv ? null : number);
  };

  return (
    <div className="dropdown_container">
      <DropDown
        IsOpened={openedDiv === 1}
        title="Product details"
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
        title="Product features"
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
