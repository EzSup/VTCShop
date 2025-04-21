import React, { useState, useEffect } from "react";
import { DropdownContainer, Button } from "../Components";
import axiosInstance from "../axiosInstance";

const PriceFilter = ({ updateFilter, isOpen, onToggle, title }) => {
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchAllProducts = async () => {
    try {
      const response = await axiosInstance.post("/products/list", {});
      const products = response.data;

      if (products.length > 0) {
        const discountedPrices = products.map((product) =>
          product.discount
            ? Math.round(product.price - product.price * (product.discount / 100))
            : Math.round(product.price)
        );

        const min = Math.min(...discountedPrices);
        const max = Math.max(...discountedPrices);

        setMinPrice(min);
        setMaxPrice(max);
        setPrice(max);
      }
    } catch (error) {
      console.error("Failed to fetch products for price filter:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handlePriceChange = (e) => {
    setPrice(Number(e.target.value));
  };

  const handleSubmit = () => {
    updateFilter("price", price);
  };

  const handleReset = () => {
    setPrice(maxPrice);
    updateFilter("price", maxPrice);
  };

  return (
    <DropdownContainer title={title} onToggle={onToggle} isOpen={isOpen}>
      <div className="list-head price">
        <div className="part reset" onClick={handleReset}>
          Reset
        </div>
      </div>
      {loading ? (
        <p className="b2">Loading...</p>
      ) : (
        <div className="checkboxes">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handlePriceChange}
          />
          <p className="b2">Selected Price: ${price}</p>
          <button onClick={handleSubmit} className="pargraph default submit-button">
            Submit
          </button>
        </div>
      )}
    </DropdownContainer>
  );
};

export default PriceFilter;
