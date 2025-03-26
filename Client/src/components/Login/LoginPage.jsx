import { useState } from "react";
import { Header, Resp, Input, Button } from "../Components";
import "./LoginPage.scss";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log("Login Success:", data);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log("Registration Success:", data);
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="login_container">
        <div className="login_wrap">
          <form>
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            >
              Full Name
            </Input>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            >
              Email
            </Input>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            >
              Password
            </Input>
            <Button className="form_submit" Onclick={handleSubmit} type="submit">
              Submit
            </Button>
            <Button className="form_submit" Onclick={handleRegister} type="submit">
              Registration
            </Button>
          </form>
        </div>
      </section>
      <div className="Login_footer"></div>
    </>
  );
};

export default LoginPage;
