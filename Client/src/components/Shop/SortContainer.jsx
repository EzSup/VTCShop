import GetData from "../GetData";
import { Loading, DropdownContainer } from "../Components";
import { forwardRef, useEffect, useRef, useState } from "react";

const SortContainer = ({ updateSort }) => {
  const { items: sortData, loading } = GetData({ name: "sortData" });
  const [openSorter, setOpenSorter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default_byId");
  const radioRef = useRef({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setOpenSorter(true);
      } else {
        setOpenSorter(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleOptionChange = (event) => {
    const { name, value } = event.target;
    const newSelectedOption = { parameter: name, fromTo: value };
    setSelectedOption(value);
    updateSort(newSelectedOption);
  };

  if (loading) return <Loading />;

  const handleToggle = () => {
    setOpenSorter(!openSorter);
  };

  const GetOptionTitle = () => {
    const selectedOpt = sortData.find((opt) => opt.type === selectedOption);
    return selectedOption !== "default_byId"
      ? selectedOpt.caption
      : "Select Sort Type";
  };

  return (
    <div className="sorting">
      <div className="sortBy frame">
        <div className="title">
          <p className="p1">Sort By</p>
        </div>
        <div className="sortType" onClick={handleToggle}>
          <DropdownContainer
            title={GetOptionTitle()}
            isOpen={openSorter}
          >
            <div className="radioInputs">
              {sortData.map((opt, optIndex) => (
                <Radio
                  key={optIndex}
                  name={"sortOption"}
                  value={opt.type}
                  onChange={handleOptionChange}
                  ref={(el) => {
                    radioRef.current[opt] = el;
                  }}
                  checked={selectedOption === opt.type}
                >
                  {opt.caption}
                </Radio>
              ))}
            </div>
          </DropdownContainer>
        </div>
      </div>
    </div>
  );
};

export default SortContainer;

const Radio = forwardRef(
  ({ name, value, onChange, children, checked }, ref) => {
    return (
      <label className="pargraph default" htmlFor={value}>
        <input
          type="radio"
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          ref={ref}
        />
        {children}
      </label>
    );
  }
);
