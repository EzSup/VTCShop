import React, { useState, useEffect } from "react";
import { DropdownContainer, Button } from "../Components";
import GetData from "../GetData";

const PriceFilter = ({ updateFilter, isOpen, onToggle, title }) => {
  const { items: diapasone, loading } = GetData({ name: "items" });

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return Math.round(price);
    return Math.round(price - price * (discount / 100));
  };

  const discountedPrices = diapasone.map((item) =>
    calculateDiscountedPrice(item.price, item.discount)
  );

  const minPrice = Math.min(...discountedPrices);
  const maxPrice = Math.max(...discountedPrices);
  const [price, setPrice] = useState(maxPrice);

  useEffect(() => {
    if (!loading && diapasone.length > 0) {
      setPrice(maxPrice);
    }
  }, [loading, maxPrice]);

  const handlePriceChange = (e) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
  };

  const handleSubmit = () => {
    updateFilter("price", price);
  };

  const handleReset = () => {
    setPrice(maxPrice);
    updateFilter("price", maxPrice);
  }

  return (
    <DropdownContainer title={title} onToggle={onToggle} isOpen={isOpen}>
      <div className="list-head price">
        <div className="part reset" onClick={handleReset}>
          Reset
        </div>
      </div>
      <div className="checkboxes">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={handlePriceChange}
        />
        <p className="b2">Selected Price: {price}</p>
        <button onClick={handleSubmit} className="pargraph default submit-button">Submit</button>
      </div>
    </DropdownContainer>
  );
};

export default PriceFilter;
