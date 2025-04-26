import useFetch from "../useFetch";

const useBestSellers = () => {
  const { data, loading, error } = useFetch("/products/bestSellers");
  return { data, loading, error };
};

export default useBestSellers;
