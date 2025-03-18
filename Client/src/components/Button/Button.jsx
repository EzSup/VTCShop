import classes from "./button.module.scss";

const Button = ({ children, Width, Onclick, className = "" }) => {
  return (
    <div className={`${classes.button} button ${className}`}>
      <button
        className="p2"
        style={{ width: Width }}
        onClick={Onclick}
        title={className}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
