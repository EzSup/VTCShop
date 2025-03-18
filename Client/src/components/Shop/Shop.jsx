import "./Shop.scss";
import Item from "../Items/Item";
import GetData from "../GetData";
import { Loading, Button } from "../Components";
import { useEffect, useMemo, useState } from "react";
import FiltersContainer from "./FiltersContainer";
import SortContainer from "./SortContainer";
import { useLocation, useNavigate } from "react-router-dom";

const Shop = () => {
  const { items, loading } = GetData({ name: "items" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtersView, setFiltersView] = useState(true);
  const [filters, setFilters] = useState({
    size: "",
    type: "",
    color: "",
    soldout: "",
  });
  const [sortedItems, setSortedItems] = useState([]);
  const [sortOption, setSortOption] = useState("default_byId");

  const location = useLocation();
  const navigate = useNavigate();

  const updateUrl = (newFilters) => {
    const searchParams = new URLSearchParams(location.search);
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key].length > 0) {
        searchParams.set(key, newFilters[key].join(","));
      } else {
        searchParams.delete(key);
      }
    });
    navigate(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = {
      size: searchParams.get("size") ? searchParams.get("size").split(",") : [],
      type: searchParams.get("type") ? searchParams.get("type").split(",") : [],
      color: searchParams.get("color")
        ? searchParams.get("color").split(",")
        : [],
      soldout: searchParams.get("soldout")
        ? searchParams.get("soldout").split(",")
        : [],
    };
    setFilters(newFilters);
  }, [location.search]);

  const filteredItems = useMemo(
    () => filterItems(items, filters),
    [items, filters]
  );

  useEffect(() => {
    const [sortType, sortOrder] = sortOption.split("_");
    const sorted = sortItems(filteredItems, sortType, sortOrder);
    setSortedItems(sorted);
  }, [filteredItems, sortOption]);

  const updateFilter = (name, value) => {
    const newFilters = {
      ...filters,
      [name]: value,
    };
    setFilters(newFilters);
    updateUrl(newFilters);
  };

  const updateSort = ({ fromTo }) => {
    setSortOption(fromTo);
  };

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

  if (loading) return <Loading />;

  return (
    <section className="shopSection">
      <Button
          className={`show_filters ${filtersView ? "clicked" : ""}`}
          Onclick={HandleShowFilters}
          Width={"90%"}
        >
          {!filtersView ? ("Filter and Sort By") : ("Hide Filters and Sort")}
        </Button>
      <div className={`filters-container ${filtersView ? "showed" : "hidden"}`}>
        <FiltersContainer
          updateFilter={updateFilter}
          items={filteredItems}
          filters={filters}
        />
        <SortContainer updateSort={updateSort} />
      </div>
      <div className={`items ${isExpanded ? "items-expanded" : ""}`}>
        <ItemsWrap items={sortedItems} />
      </div>
      {filteredItems.length > 6 && (
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
            Quick Add <span>+</span>
          </Button>
        </Item>
      ))}
    </div>
  );
};

const matchFilter = (filterValues, itemValue, comparisonFn) => {
  if (!Array.isArray(filterValues)) {
    filterValues = [filterValues];
  }

  if (filterValues.length === 0 || filterValues[0] === "") return true;
  return filterValues.some((filterValue) =>
    comparisonFn
      ? comparisonFn(itemValue, filterValue)
      : itemValue === filterValue
  );
};

const filterItems = (items, filters) => {
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return price - price * (discount / 100);
  };

  return items.filter((item) => {
    const matchSize = matchFilter(filters.size, item.sizes, (sizes, size) =>
      sizes.includes(size)
    );
    const matchType = matchFilter(filters.type, item.type);
    const matchColor = matchFilter(filters.color, item.color);
    const matchAvailability = matchFilter(
      filters.soldout,
      item.soldout,
      (soldout, status) => soldout === (status === "true")
    );

    const discountedPrice = calculateDiscountedPrice(item.price, item.discount);
    const matchPrice = filters.price ? discountedPrice <= filters.price : true;

    return (
      matchSize && matchType && matchColor && matchAvailability && matchPrice
    );
  });
};

const sortItems = (items, sortType, sortOrder) => {
  const isAscending = sortOrder === "lowToHigh";

  return [...items].sort((a, b) => {
    const finalPriceA = a.price * (1 - a.discount / 100);
    const finalPriceB = b.price * (1 - b.discount / 100);

    if (sortType === "price") {
      return isAscending
        ? finalPriceA - finalPriceB
        : finalPriceB - finalPriceA;
    } else if (sortType === "sale") {
      return b.discount - a.discount;
    }

    return 0;
  });
};
