const Input = ({
  type = "text",
  children,
  name = children,
  placeholder = "value",
  value,
  onChange,
}) => {
  return (
    <div className="_input">
      <label htmlFor={name} style={{ marginRight: "10px" }}>
        {children}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
