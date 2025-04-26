import "./Shop.scss";
import Item from "../Items/Item";
import { Loading, Button } from "../Components";
import { useEffect, useState } from "react";
import FiltersContainer from "./FiltersContainer";
import SortContainer from "./SortContainer"
import { useLocation, useNavigate } from "react-router-dom";
import useProducts from "./useProducts";
import useCategories from "./useCategories";
import axiosInstance from "../AxiosInstance";

const Shop = () => {
  const [sortType, setSortType] = useState("default_byId");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtersView, setFiltersView] = useState(true);
  const [filters, setFilters] = useState({
    categoriesIds: [],
    minPrice: 0,
    maxPrice: 999999,
  });
  const { products, loading, error } = useProducts({ filters });
  const { categories, loading: catLoading } = useCategories();
  const [sizes, setSizes] = useState([]);

  console.log(products);

  useEffect(() => {
    setSortedProducts(products);
  }, [products])

  useEffect(() => {
    let sorted = [...products];

    if (sortType === "price_asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "price_desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "name_asc") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortType === "name_desc") {
      sorted.sort((a, b) => b.title.localeCompare(a.title));
    } else {
      sorted = [...products];
    }

    setSortedProducts(sorted);
  }, [sortType, products]);

  const updateSort = (newSort) => {
    setSortType(newSort);
  };


  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await axiosInstance.post("/products/list", filters);
        const allSizes = response.data.flatMap(product => product.availableSizes || []);
        const uniqueSizes = Array.from(new Set(allSizes)).sort((a, b) => a - b);
        setSizes(uniqueSizes);

      } catch (error) {
        console.error("Помилка при отриманні розмірів:", error);
      }
    };
  
    fetchSizes();
  }, []);

  const updateFilters = (partial) =>
    setFilters((prev) => ({ ...prev, ...partial }));

  const HandleButtonClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setFiltersView(window.innerWidth >= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const HandleShowFilters = () => {
    setFiltersView(!filtersView);
  };

  if (loading || catLoading) return <Loading />;
  if (error) console.log(error);

  return (
    <section className="shopSection">
      <Button
        className={`show_filters ${filtersView ? "clicked" : ""}`}
        Onclick={HandleShowFilters}
        Width={"90%"}
      >
        {!filtersView ? "Filter and Sort By" : "Hide Filters and Sort"}
      </Button>
      <div className={`filters-container ${filtersView ? "showed" : "hidden"}`}>
        <FiltersContainer
          filters={filters}
          updateFilters={updateFilters}
          categories={categories}
          sizes={sizes}
        />

        <SortContainer updateSort={updateSort} />
      </div>
      <div className={`items ${isExpanded ? "items-expanded" : ""}`}>
        <ItemsWrap items={sortedProducts} />
      </div>
      {products.length > 6 && (
        <Button className="items_more" Onclick={HandleButtonClick} Width={200}>
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </section>
  );
};
export default Shop;

const ItemsWrap = ({ items }) => {
  const navigate = useNavigate();

  const goToItemDetails = (item) => {
    navigate(`/item/${item.id}`);
  };

  return (
    <div className="Collection">
      {items.map((item, index) => (
        <Item key={index} {...item}>
          <Button key={item.id} Onclick={() => goToItemDetails(item)}>
            Переглянути
          </Button>
        </Item>
      ))}
    </div>
  );
};
