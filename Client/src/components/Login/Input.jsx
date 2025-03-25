import "./LoginPage.scss"

const Input = ({type = "text", children, name = children, placeholder = "value"}) => {
    return(
        <div className="_input">
            <label htmlFor={name}>{children}</label>
            <input type={type} name={name} placeholder={placeholder}></input>
        </div>
    )
}

export default Input;