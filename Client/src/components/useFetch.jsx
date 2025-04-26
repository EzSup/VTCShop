import { useState, useEffect } from "react";
import axiosInstance from "./AxiosInstance";

const useFetch = (url, { skip = false } = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!skip);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (skip || !url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(url);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, skip]);

  return { data, loading, error };
};

export default useFetch;
