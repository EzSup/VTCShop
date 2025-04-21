import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const useProducts = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const payload = {
          categoriesIds: filters.type?.map(Number) || [],
          sizes: filters.size?.map(Number) || [],
          minPrice: 0,
          maxPrice: filters.price || 999999,
        };

        const res = await axiosInstance.post("/products/list", payload);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading };
};

export default useProducts;
