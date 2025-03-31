import { Header, Resp, Input, Button } from "../Components";
import "./LoginPage.scss";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [formState, setFormState] = useState("login");
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
  });
  
  useEffect(() => {
    if (isLoggedIn) {
      setFormState("logout");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(login());
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

      if (response.ok) {
        navigate("/");
      }

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

      if (response.ok) {
        setFormState("login");
      }
    } catch (error) {
      console.error("Registration Error:", error);
    }
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:5000/auth/logout", {
        method: "DELETE",
      });
      if (response.ok) {
        dispatch(logout());
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <>
      <Header />
      <section className="login_container">
        <div className="login_wrap">
          <form>
            {formState !== "logout" && (
              <>
                {formState === "register" && (
                  <Input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  >
                    Full Name
                  </Input>
                )}
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
              </>
            )}

            {formState === "login" && (
              <>
                <Button
                  className="form_submit"
                  Onclick={handleSubmit}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  className="form_submit"
                  Onclick={() => setFormState("register")}
                >
                  Go To Registration
                </Button>
              </>
            )}

            {formState === "register" && (
              <>
                <Button
                  className="form_submit"
                  Onclick={handleRegister}
                  type="submit"
                >
                  Register
                </Button>
                <Button
                  className="form_submit"
                  Onclick={() => setFormState("login")}
                >
                  Back to Login
                </Button>
              </>
            )}

            {formState === "logout" && (
              <>
                <p>Are you sure you want to quit?</p>
                <Button
                  className="form_submit"
                  Onclick={handleLogOut}
                  type="reset"
                >
                  Log Out
                </Button>
              </>
            )}
          </form>
        </div>
      </section>
      <div className="Login_footer"></div>
    </>
  );
};

export default LoginPage;
