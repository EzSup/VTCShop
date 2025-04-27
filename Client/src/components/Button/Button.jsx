import classes from "./button.module.scss";

const Button = ({type= "button", children, Width, Onclick, className = "" }) => {
  return (
    <div className={`${classes.button} button ${className}`}>
      <button
        className="p2"
        style={{ width: Width }}
        onClick={Onclick}
        title={className}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};
export default Button;
