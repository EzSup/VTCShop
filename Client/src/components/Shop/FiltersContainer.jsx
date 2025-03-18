import Filter from "./Filters";
import GetData from "../GetData";
import { Loading } from "../Components";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";

const FiltersContainer = ({ updateFilter, items, filters }) => {
  const { items: filtersData, loading } = GetData({ name: "filtersData" });
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
      if(mobileContainer) return id;
      return prevId === id ? null : id;
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const filterValue =
      value === "true" ? true : value === "false" ? false : value;
    updateFilter(name, filterValue);
  };

  const itemsInStock = items.filter((item) => item.soldout === false).length;
  const itemsOutOfStock = items.filter((item) => item.soldout === true).length;

  const availabilityCaptions = {
    true: `Out of stock (${itemsOutOfStock})`,
    false: `In stock (${itemsInStock})`,
  };

  if (loading) return <Loading />;
  return (
    <div className="filtration">
      <div className="filteredBy frame">
        <div className="title">
          <p className="p1">Filtered By</p>
        </div>
        <div className="filters">
          <div className="scrollbar">
            {filtersData.map((_filter, index) => {
              return _filter.type === "price" ? (
                <PriceFilter
                  key={index}
                  updateFilter={updateFilter}
                  onToggle={() => handleToggle(index)}
                  isOpen={openFilter === index}
                  title={_filter.title}
                />
              ) : (
                <Filter
                  key={index}
                  isOpen={openFilter === index}
                  onToggle={() => handleToggle(index)}
                  type={_filter.type}
                  options={_filter.options}
                  onChange={handleFilterChange}
                  title={_filter.title}
                  optionsCaption={
                    _filter.type === "soldout" ? availabilityCaptions : null
                  }
                  selectedOptions={filters[_filter.type] || []}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersContainer;
