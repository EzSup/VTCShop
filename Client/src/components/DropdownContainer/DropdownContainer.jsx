import "./DropdownContainer.scss";

const DropdownContainer = ({ children, title, onToggle, isOpen }) => {
    return (
      <div className="filter">
        <span className={`filter-arrow ${!isOpen ? "" : "rotated"}`}></span>
        <p className="filter-title p2">{title}</p>
        <div className="toggle_button" onClick={onToggle}></div>
        <div className={`dropdown-list ${!isOpen ? "hidden" : ""}`}>
          {children}
        </div>
      </div>
    );
  };
  export default DropdownContainer;