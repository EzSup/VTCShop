import { useState } from "react";

const useApiRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async ({
    url,
    method = "GET",
    headers = {},
    body = null,
  }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", ...headers },
        body: body ? JSON.stringify(body) : null,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");

      return data;
    } catch (err) {
      setError(err.message);
      console.error("API Request Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};

export default useApiRequest;
