import { forwardRef, useRef, useState } from "react";
import { DropdownContainer } from "../Components";

const Filter = ({
  type,
  options,
  onChange,
  isOpen,
  onToggle,
  title,
  optionsCaption,
  selectedOptions,
}) => {
  const checkboxesRef = useRef({});
  
  const handleOptionChange = () => {
    const newSelectedOptions = Object.keys(checkboxesRef.current).filter(
      (option) => checkboxesRef.current[option].checked
    );
    const event = {
      target: { name: type, value: newSelectedOptions },
    };
    onChange(event);
  };

  const handleReset = () => {
    Object.keys(checkboxesRef.current).forEach((option) => {
      if (checkboxesRef.current[option]) {
        checkboxesRef.current[option].checked = false;
      }
    });
    const event = {
      target: { name: type, value: [] },
    };
    onChange(event);
  };

  const OptinsLength = selectedOptions.length;

  return (
    <DropdownContainer
      title={`${title} ${OptinsLength > 0 ? `(${OptinsLength})` : "   "}`}
      onToggle={onToggle}
      isOpen={isOpen}
    >
      <div className="list-head">
        <div className="part counter">{selectedOptions.length} selected</div>
        <div className="part reset" onClick={handleReset}>
          Reset
        </div>
      </div>
      <div className="checkboxes">
        {options.map((option, index) => (
          <CheckBox
            key={index}
            name={type}
            value={option}
            onChange={handleOptionChange}
            ref={(el) => {
              checkboxesRef.current[option] = el;
              if (el && selectedOptions.includes(option)) {
                el.checked = true;
              }
            }}
          >
            {optionsCaption ? optionsCaption[option] : option}
          </CheckBox>
        ))}
      </div>
    </DropdownContainer>
  );
};
export default Filter;

const CheckBox = forwardRef(({ name, value, onChange, children }, ref) => {
  return (
    <label className="pargraph default">
      <input
        type="checkbox"
        name={name}
        value={value}
        onChange={onChange}
        ref={ref}
      />
      {children}
    </label>
  );
});
