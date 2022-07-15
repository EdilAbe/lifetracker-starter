import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";
import { useState } from "react";

export default function LoginForm() {
  const authcont = useAuthContext();
  //const loginUser = authcont.loginUser;
  //const { user, setUser } = React.useState({});
  const setErrors = authcont.setError;

  const [form, setForm] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { isAuthorized, user, setUser, setIsAuthorized } = useAuthContext();

  React.useEffect(() => {
    if (user?.email) {
      navigate("/activity");
    }
  }, [user, navigate]);

  const handleOnInputChange = (evt) => {
    // check if email is valid
    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email" }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (evt.target.name === "email") {
      if (evt.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }
    setForm((f) => ({ ...f, [evt.target.name]: evt.target.value }));
  };

  const handleOnFormSubmit = async (evt) => {
    evt.preventDefault();
    // setIsAuthorized(false);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.login(form);
    console.log("Data", data);
    console.log("Error", error);
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
    }
    if (data?.user) apiClient.setToken(data.token);
    setUser(data.user);
    // setIsAuthorized(true);

    // navigate("/activity");
  };

  return (
    <div className="login-form">
      <div className="login-card">
        <h2>Login</h2>

        {/* verify if the user is logged in before accessing this page */}

        <form className="form">
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              className="form-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleOnInputChange}
            />
            {/* {errors.email && <span className="error">{errors.email}</span>} */}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              className="form-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleOnInputChange}
            />
            {/* {errors.password && (
              <span className="error">{errors.password}</span>
            )} */}
          </div>

          <button
            className="submit-login main-button"
            onClick={handleOnFormSubmit}
          >
            Log in
          </button>
        </form>

        <div className="footer">
          <p>
            Don't have an account? Sign up{" "}
            <Link to="/register" className="inline-link">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
