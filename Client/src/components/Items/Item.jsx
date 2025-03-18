import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Item.scss";
import { Link } from "react-router-dom";
import { Resp } from "../Components";

const Item = ({
  discount,
  sellingFast,
  soldout,
  preview,
  title,
  price,
  sizes,
  children,
  id,
}) => {
  const HasDiscount = discount > 0;
  const SellingFast = sellingFast;
  const Soldout = soldout;
  const newPrice = Math.round(price - price * (discount / 100));
  const Sizes = ["S", "M", "L", "XL", "2XL", "3XL", "4XL"];

  const navigate = useNavigate();

  const goToItemDetails = (id) => {
    navigate(`/item/${id}`, { replace: true });
    window.location.reload();
  };

  return (
    <ItemContainer Sold={Soldout}>
      <div className="item-wrap">
        <div className="preview">
          <span className="product-tags">
            {Soldout && <TagsDiv Color="Black_tag">sold out</TagsDiv>}
            {SellingFast && <TagsDiv Color="Black_tag">selling fast</TagsDiv>}
            {HasDiscount && (
              <TagsDiv Color="White_tag">{discount}% off</TagsDiv>
            )}
          </span>
          <div className="preview-image">
            <div style={{ backgroundImage: `url(${preview})` }}></div>
          </div>
          {!Soldout && (
            <>
              {!children ? (
                <div className="hover_container sizelist">
                  {Sizes.map((size) => (
                    <Button
                      key={size}
                      className={`${!sizes.includes(size) ? "sold" : ""}`}
                      Onclick={
                        !sizes.includes(size)
                          ? null
                          : () => {
                              goToItemDetails(id);
                              console.log(`${title} ${size}`);
                            }
                      }
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="hover_container"> {children} </div>
              )}
            </>
          )}
        </div>
        <div className="description">
          <div className="textbar">
            <Resp Tag="p" Class="p2 item_title" altClass="System S12_L20 item_title">
              {title}
            </Resp>
            <ItemPrice
              _HasDiscount={HasDiscount}
              _price={price}
              _newPrice={newPrice}
            />
          </div>
          <Button Onclick={() => goToItemDetails(id)}>
            <div className="buy-button" title="buy"></div>
          </Button>
        </div>
      </div>
    </ItemContainer>
  );
};
export default Item;

const ItemContainer = ({ children, Sold }) => {
  const sold = Sold;

  let classes = "item";
  if (sold) classes += " sold";

  return <div className={classes}>{children}</div>;
};

const TagsDiv = ({ Color, children }) => {
  return (
    <div className={Color}>
      <Resp Tag="p" Class="S12_L20 UpC" altClass="S10_L16 UpC">
        {children}
      </Resp>
    </div>
  );
};

const ItemPrice = ({ _HasDiscount, _price, _newPrice }) => {
  return (
    <div className="price">
      {_HasDiscount ? (
        <>
          <p className="S12_L20 newPrice">${_newPrice}</p>
          <p className="S12_L20 oldPrice">${_price}</p>
        </>
      ) : (
        <p className="S12_L20">${_price}</p>
      )}
    </div>
  );
};
