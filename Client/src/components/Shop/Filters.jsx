import { DropdownContainer } from "../Components";

const Filter = ({
  type,
  options,
  title,
  isOpen,
  onToggle,
  selected = [],
  onChange,
}) => {
  const toggleOption = (id) => {
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(next);
  };

  const handleReset = () => onChange([]);

  const sizeMap = {
    1: "S",
    2: "M",
    3: "L",
    4: "XL",
    5: "2XL",
    6: "3XL",
  };

  return (
    <DropdownContainer
      title={`${title} (${selected.length || 0})`}
      isOpen={isOpen}
      onToggle={onToggle}
    >
      <div className="list-head">
        <div className="part counter">{selected.length} обрано</div>
        <div className="part reset" onClick={handleReset}>
          Очистити
        </div>
      </div>

      <div className="checkboxes">
        {options.map(({ id, label }) => (
          <label key={id} className="pargraph default">
            <input
              type="checkbox"
              checked={selected.includes(Number(id))}
              onChange={() => toggleOption(Number(id))}
            />
            {type === "size" ? sizeMap[label] || label : label}
          </label>
        ))}
      </div>
    </DropdownContainer>
  );
};
export default Filter;
