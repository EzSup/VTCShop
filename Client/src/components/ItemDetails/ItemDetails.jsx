import { useParams } from "react-router-dom";
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
  const [count, SetCount] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const HandleButtonAdd = () => {
    SetCount(count + 1);
  };

  const HandleButtonSubtract = () => {
    SetCount(count - 1);
  };

  const HandleButtonBuy = (text) => {
    const details = text.split("\n").filter(Boolean);
    setModalText(
      details.map((text, index) => {
        if (index === 0) {
          return <p key={index} className="b2 title">{text}</p>;
        } else {
          const subtext = text.split("\t").filter(Boolean);
          return (
            <div key={index}>
              {subtext.map((_text, _index) => (
                <p key={_index} className={`b2 ${_index === 0 ? "title_sub" : ""}`}>
                  {_text}
                </p>
              ))}
            </div>
          );
        }
      })
    );
    setModalOpen(true);
  };
  

  const min = count > 1;
  const max = count < 99;

  const closeMessage = () => setModalOpen(false);

  return (
    <div className="addToCard">
      <div className="buttons_wrap">
        <div className="items_count">
          <button
            className={`change_count S24_L32 ${min ? "" : "disabled"}`}
            onClick={min ? HandleButtonSubtract : null}
          >
            -
          </button>
          <p className="p2">{count}</p>
          <button
            className={`change_count S24_L32 ${max ? "" : "disabled"}`}
            onClick={max ? HandleButtonAdd : null}
          >
            +
          </button>
        </div>
        <Button
          Onclick={
            !size
              ? null
              : () =>
                  HandleButtonBuy(
                    `Item Info\n
                    item: \t ${item.title}\n
                    color: ${item.color}\n
                    size: ${size}\n
                    count: ${count}`
                  )
          }
          className={`${!size ? "disabled" : ""}`}
        >
          {!size ? "Select the Size" : "Add to Cart"}
        </Button>
        <Message
          open={modalOpen}
          duration={3000}
          onClose={closeMessage}
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
