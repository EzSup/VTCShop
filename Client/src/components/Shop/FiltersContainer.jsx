import Filter from "./Filters";
import { Loading } from "../Components";
import { useEffect, useState } from "react";
import PriceFilter from "./PriceFilter";
import axiosInstance from "../AxiosInstance";

const FiltersContainer = ({ updateFilter, filters }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilter, setOpenFilter] = useState(null);
  const [mobileContainer, setMobileContainer] = useState(false);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const res = await axiosInstance.get("/categories/all");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

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

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = Array.isArray(value)
      ? value.map((v) => (v === "true" ? true : v === "false" ? false : v))
      : value;
    updateFilter(name, parsedValue);
  };

  const filtersData = [
    {
      type: "categoryId",
      title: "Category",
      options: categories.map((cat) => ({
        id: cat.id,
        label: cat.name,
      })),
    },
    {
      type: "price",
      title: "Price",
    },
  ];

  if (loading) return <Loading />;

  return (
    <div className="filtration">
      <div className="filteredBy frame">
        <div className="title">
          <p className="p1">Filtered By</p>
        </div>
        <div className="filters">
          <div className="scrollbar">
            {filtersData.map((_filter, index) =>
              _filter.type === "price" ? (
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
                  type={_filter.type}
                  options={_filter.options}
                  onChange={handleFilterChange}
                  isOpen={openFilter === index}
                  onToggle={() => handleToggle(index)}
                  title={_filter.title}
                  selectedOptions={filters[_filter.type] || []}
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
