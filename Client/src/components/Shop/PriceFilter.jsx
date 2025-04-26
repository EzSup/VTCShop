import React, { useEffect, useState } from "react";
import { DropdownContainer } from "../Components";
import axiosInstance from "../AxiosInstance";

const PriceFilter = ({
  isOpen,
  title,
  minPrice: propMin,
  maxPrice: propMax,
  onChange,
  onToggle,
}) => {
  const [minPrice, setMinPrice] = useState(propMin ?? 0);
  const [maxPrice, setMaxPrice] = useState(propMax ?? 0);
  const [price, setPrice] = useState(propMax ?? 0);
  const [loading, setLoading] = useState(propMin == null || propMax == null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (propMin != null && propMax != null) return;

      try {
        const res = await axiosInstance.post("/products/list", {});
        const products = res.data;

        if (products.length) {
          const prices = products.map((p) =>
            p.discount
              ? Math.round(p.price - p.price * (p.discount / 100))
              : Math.round(p.price)
          );

          const min = Math.min(...prices);
          const max = Math.max(...prices);

          setMinPrice(min);
          setMaxPrice(max);
          setPrice(max);
        }
      } catch (err) {
        console.error("Failed to fetch products for price filter:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, [propMin, propMax]);

  const handlePriceChange = (e) => setPrice(Number(e.target.value));

  const handleSubmit = () => onChange?.({ minPrice, maxPrice: price });

  const handleReset = () => {
    setPrice(maxPrice);
    onChange?.({ minPrice, maxPrice });
  };

  return (
    <DropdownContainer title={title} isOpen={isOpen} onToggle={onToggle}>
      <div className="list-head price">
        <div className="part reset" onClick={handleReset}>
          Очистити
        </div>
      </div>

      {loading ? (
        <p className="b2">Завантаження…</p>
      ) : (
        <div className="checkboxes">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            value={price}
            onChange={handlePriceChange}
          />
          <p className="b2">Обрана ціна: {price}₴</p>
          <button
            onClick={handleSubmit}
            className="pargraph default submit-button"
          >
            Submit
          </button>
        </div>
      )}
    </DropdownContainer>
  );
};

export default PriceFilter;
