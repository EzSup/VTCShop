import { useState, useEffect } from "react";

const GetData = ({ name, id = null }) => {
  const dataSource = id ? `https://dev-test-api-1gmm.onrender.com/${name}/${id}` : `https://dev-test-api-1gmm.onrender.com/${name}`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${dataSource}`);
        const data = await response.json();
        setItems(id ? [data] : data);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(true);
      } finally {
        setLoading(false);
        console.log(`Data has been uploaded`);
      }
    };

    fetchData();
  }, []);

  return { items, loading };
}
export default GetData
