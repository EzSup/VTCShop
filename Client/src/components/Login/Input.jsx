import "./LoginPage.scss"

const Input = ({type = "text", title = "title", name, placeholder = "value"}) => {
    return(
        <div className="_input">
            <label htmlFor={name}>{title}</label>
            <input type={type} name={name} placeholder={placeholder}></input>
        </div>
    )
}

export default Input;