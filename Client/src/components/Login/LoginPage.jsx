import { Header,  Resp, Input, Button } from "../Components";
import "./LoginPage.scss"

const LoginPage = () => {
    const HandleSubmit = () => {
        return
    }
    const HandleRegister = () => {
        return
    }
    return(
        <>
        <Header />
        <section className="login_container">
            <div className="login_wrap">
                <form>
                <Input>Name</Input>
                <Input type="email">Email</Input>
                <Input type="tel">Phone</Input>
                <Input type="password">Password</Input>
                <Button className="form_submit" Onclick={() => HandleSubmit}>Submit</Button>
                <Button className="form_submit" Onclick={() => HandleRegister}>Registration</Button>
                </form>
            </div>
        </section>
        <div className="Login_footer"></div>
        </>
    )
}
export default LoginPage;