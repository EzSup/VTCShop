import useFetch from "../useFetch"

const useProductById = (id) => {
  const { data: product, loading, error } = useFetch(id ? `/products?id=${id}` : null, { skip: !id });
  return { product, loading, error };
};

export default useProductById;
