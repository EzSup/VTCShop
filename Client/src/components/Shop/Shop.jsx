import "./Shop.scss";
import Item from "../Items/Item";
import { Loading, Button } from "../Components";
import { useEffect, useState } from "react";
import FiltersContainer from "./FiltersContainer";
import { useLocation, useNavigate } from "react-router-dom";
import useProducts from "./useProducts";
import useCategories from "./useCategories";

const Shop = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtersView, setFiltersView] = useState(true);
  const [filters, setFilters] = useState({
    categoriesIds: [],
    //sizes: [],
    minPrice: 0,
    maxPrice: 999999,
  });
  const { products, loading, error } = useProducts({ filters });
  const { categories, loading: catLoading } = useCategories();

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
        />

        {/** <SortContainer ... />*/}
      </div>
      <div className={`items ${isExpanded ? "items-expanded" : ""}`}>
        <ItemsWrap items={products} />
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
