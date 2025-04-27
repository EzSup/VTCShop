import Filter from "./Filters";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";

const FiltersContainer = ({ filters, updateFilters, categories, sizes }) => {
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
      options: categories.map((cat) => ({ id: cat.id.toString(), label: cat.name })),
      selected: filters.categoriesIds,
      onChange: (arr) => updateFilters({ categoriesIds: arr }),
    },
    { 
      type: "price", 
      title: "Ціна" 
    },
    {
      type: "size",
      title: "Розмір",
      options: sizes.map((size) => ({ id: size, label: size })),
      selected: filters.sizes,
      onChange: (arr) => updateFilters({ sizes: arr }),
    }
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
                  onChange={(range) => updateFilters(range)}
                  onToggle={() => handleToggle(idx)}
                />
              ) : (
                <Filter
                  key={idx}
                  type={f.type}
                  title={f.title}
                  options={f.options}
                  selected={f.selected}
                  onChange={(arr) => f.onChange(arr)} 
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
