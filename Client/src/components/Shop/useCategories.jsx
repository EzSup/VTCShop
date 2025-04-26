import useFetch from "../useFetch";

const useCategories = () => {
  const { data: categories, loading, error } = useFetch("/categories/all");
  return { categories, loading, error };
};

export default useCategories;
