import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";

const useProducts = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const payload = {
          categoriesIds: filters.categoriesIds || [],
          sizes: filters.sizes || [],
          minPrice: filters.minPrice || 0,
          maxPrice: filters.maxPrice || 999999,
        };

        const res = await axiosInstance.post("/products/list", payload);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  return { products, loading, error };
};

export default useProducts;
