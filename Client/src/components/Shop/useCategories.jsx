import { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/categories/all");
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
