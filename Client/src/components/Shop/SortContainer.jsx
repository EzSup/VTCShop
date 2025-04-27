import { DropdownContainer } from "../Components";
import { forwardRef, useEffect, useRef, useState } from "react";

const sortOptions = [
  { type: "default_byId", caption: "за замовч." },
  { type: "price_asc", caption: "Ціна: за зрост." },
  { type: "price_desc", caption: "Ціна: за зменш." },
  { type: "name_asc", caption: "Назва: від A до Я" },
  { type: "name_desc", caption: "Назва: від Я до А" },
];

const SortContainer = ({ updateSort }) => {
  const [openSorter, setOpenSorter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("default_byId");

  const radioRef = useRef({});

  useEffect(() => {
    const handleResize = () => {
      setOpenSorter(window.innerWidth <= 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
    updateSort(value);
  };

  const GetOptionTitle = () => {
    const selectedOpt = sortOptions.find((opt) => opt.type === selectedOption);
    return selectedOpt ? selectedOpt.caption : "Select Sort Type";
  };

  const handleToggle = () => {
    setOpenSorter(!openSorter);
  };

  return (
    <div className="sorting">
      <div className="sortBy frame">
        <div className="title">
          <p className="p1">Сортувати за</p>
        </div>
        <div className="sortType" onClick={handleToggle}>
          <DropdownContainer title={GetOptionTitle()} isOpen={openSorter}>
            <div className="radioInputs">
              {sortOptions.map((opt, index) => (
                <Radio
                  key={index}
                  name="sortOption"
                  value={opt.type}
                  onChange={handleOptionChange}
                  ref={(el) => {
                    radioRef.current[opt.type] = el;
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

const Radio = forwardRef(({ name, value, onChange, children, checked }, ref) => (
  <label className="pargraph default" htmlFor={value}>
    <input
      type="radio"
      id={value}
      name={name}
      value={value}
      onChange={onChange}
      checked={checked}
      ref={ref}
    />
    {children}
  </label>
));
