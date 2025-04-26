import Filter from "./Filters";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";

const FiltersContainer = ({ filters, updateFilters, categories }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [mobileContainer, setMobileContainer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setMobileContainer(true);
        setOpenFilter(0);
      } else {
        setOpenFilter(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggle = (id) => {
    setOpenFilter((prevId) => {
      if (mobileContainer) return id;
      return prevId === id ? null : id;
    });
  };

  const filtersData = [
    {
      type: "categoryId",
      title: "Категорія",
      options: categories.map((cat) => ({
        id: cat.id.toString(),
        label: cat.name,
      })),
    },
    { type: "price", title: "Ціна" },
  ];

  return (
    <div className="filtration">
      <div className="filteredBy frame">
        <div className="title">
          <p className="p1">Фільтр</p>
        </div>
        <div className="filters">
          <div className="scrollbar">
            {filtersData.map((f, idx) =>
              f.type === "price" ? (
                <PriceFilter
                  key={idx}
                  isOpen={openFilter === idx}
                  title={f.title}
                  //minPrice={filters.minPrice}
                  //maxPrice={filters.maxPrice}
                  onChange={(range) => updateFilters(range)}
                  onToggle={() => handleToggle(idx)}
                />
              ) : (
                <Filter
                  key={idx}
                  type={f.type}
                  title={f.title}
                  options={f.options}
                  selected={filters.categoriesIds}
                  onChange={(arr) => updateFilters({ categoriesIds: arr })}
                  isOpen={openFilter === idx}
                  onToggle={() => handleToggle(idx)}
                />
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersContainer;
