import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import "./Item.scss";
import { Resp } from "../Components";

const Item = ({
  id,
  imageLink,
  name,
  price,
  supportsSizes,
  availableSizes,
  children,
}) => {
  const navigate = useNavigate();

  const goToItemDetails = (id) => {
    navigate(`/item/${id}`, { replace: true });
  };

  const allSizes = [1, 2, 3, 4, 5, 6];
  const sizeLabels = allSizes.map((sizeId) => {
    switch (sizeId) {
      case 1: return "XS";
      case 2: return "S";
      case 3: return "M";
      case 4: return "L";
      case 5: return "XL";
      case 6: return "2XL";
      default: return "Unknown Size";
    }
  });

  return (
    <ItemContainer>
      <div className="item-wrap">
        <div className="preview">
          <div className="preview-image">
            <div style={{ backgroundImage: `url(${imageLink})` }}></div>
          </div>
          {supportsSizes && (
            <>
              {!children ? (
                <div className="hover_container sizelist">
                  {sizeLabels.map((size, index) => (
                    <Button
                      key={size}
                      className={`${
                        !availableSizes.includes(allSizes[index]) ? "sold" : ""
                      }`}
                      Onclick={
                        !availableSizes.includes(allSizes[index])
                          ? null
                          : () => {
                              goToItemDetails(id);
                              console.log(`${name} ${size}`);
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
            <Resp
              Tag="p"
              Class="p2 item_title"
              altClass="System S12_L20 item_title"
            >
              {name}
            </Resp>
            <ItemPrice _HasDiscount={false} _price={price} />
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

const ItemContainer = ({ children }) => {
  return <div className="item">{children}</div>;
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

const ItemPrice = ({ _HasDiscount, _price }) => {
  return (
    <div className="price">
      <p className="S12_L20">${_price}</p>
    </div>
  );
};
