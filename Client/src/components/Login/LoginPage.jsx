import { Header,  Resp, Input, Button } from "../Components";
import "./LoginPage.scss"

const LoginPage = () => {
    return(
        <>
        <Header />
        <section className="login_container">
            <div className="login_wrap">
                <form>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                <Button className="form_submit">Submit</Button>
                </form>
            </div>
        </section>
        <div className="Login_footer"></div>
        </>
    )
}
export default LoginPage;