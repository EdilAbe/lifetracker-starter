import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import apiClient from "../../services/apiClient";

export default function LoginForm() {
  const [errors, setErrors] = React.useState({});
  const [form, setForm] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleOnInputChange = (evt) => {
    // check if email is valid
    setError(null);
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
    setIsLoading(true);
    setErrors((e) => ({ ...e, form: null }));

    const { data, error } = await apiClient.loginUser({
      email: form.email,
      password: form.password,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
      setIsLoading(false);
    }
    if (data?.user) {
      setName(data.user.firstName);

      navigate("/activity");
      setIsLoading(false);
      apiClient.setToken(data.token);
    }
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
            {errors.email && <span className="error">{errors.email}</span>}
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
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <button
            className="submit-login main-button"
            onClick={handleOnFormSubmit}
          >
            {isLoading ? "Loading" : "Log In"}
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
