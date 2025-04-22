import { DropdownContainer } from "../Components";

const Filter = ({ type, options, title, isOpen, onToggle, selected = [], onChange }) => {
  const toggleOption = (id) => {
    const next = selected.includes(id)
      ? selected.filter((v) => v !== id)
      : [...selected, id];
    onChange(next);
  };

  const handleReset = () => onChange([]);

  return (
    <DropdownContainer title={`${title} (${selected.length || 0})`} isOpen={isOpen} onToggle={onToggle}>
      <div className="list-head">
        <div className="part counter">{selected.length} selected</div>
        <div className="part reset" onClick={handleReset}>Reset</div>
      </div>

      <div className="checkboxes">
        {options.map(({ id, label }) => (
          <label key={id} className="pargraph default">
            <input
              type="checkbox"
              checked={selected.includes(Number(id))}
              onChange={() => toggleOption(Number(id))}
            />
            {label}
          </label>
        ))}
      </div>
    </DropdownContainer>
  );
};
export default Filter;
