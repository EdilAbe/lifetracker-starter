import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";
import { useAuthContext } from "../../contexts/auth";

export default function RegistrationForm() {
  const {
    setUser,
    user,
    error,
    setError,
    isProcessing,
    setIsProcessing,
    signupUser,
  } = useAuthContext();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const validateFields = (event) => {
    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Passwords don't match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    // confirming password
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setError((e) => ({ ...e, passwordConfirm: "Passwords don't match" }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setError((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setError((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "lastName") {
      if (event.target.value.length === 0) {
        setError((e) => ({ ...e, lastName: "Please enter your last name." }));
      } else {
        setError((e) => ({ ...e, lastName: null }));
      }
    }

    if (event.target.name === "username") {
      if (event.target.value.length === 0) {
        setError((e) => ({ ...e, username: "Please enter your username." }));
      } else {
        setError((e) => ({ ...e, username: null }));
      }
    }

    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }
  };

  const handleOnInputChange = (event) => {
    // checking if password and passwordConfirm match
    validateFields(event);
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnFormSubmit = async (event) => {
    setIsProcessing(true);
    setError((e) => ({ ...e, form: null }));

    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setError((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setError((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    const { data, error } = await apiClient.signupUser({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
    });
    if (error) {
      setError((e) => ({ ...e, form: error }));
      setIsProcessing(false);
    }
    if (data?.user) {
      setUser(data.user.firstName);

      navigate("/activity");
      setIsProcessing(false);
      apiClient.setToken(data.token);
    }
  };

  return (
    <div className="registration-form">
      <div className="registration-card">
        <h2>Register</h2>

        <form className="form">
          {/* {error.form && <span className="error">{error.form}</span>} */}
          <div className="input-field">
            <label for="email">Email</label>
            <input
              className="form-input"
              name="email"
              type="email"
              value={form.email}
              onChange={handleOnInputChange}
              placeholder="Enter a valid email"
            />
            {/* {error.email && <span className="error">{error.email}</span>} */}
          </div>

          <div className="input-field">
            <label for="username">Username</label>
            <input
              className="form-input"
              name="username"
              type="text"
              value={form.username}
              onChange={handleOnInputChange}
              placeholder="Username"
            />
            {/* {error.username && <span className="error">{error.usernamel}</span>} */}
          </div>

          <div className="name-inputs">
            <div className="input-field">
              <input
                className="form-input"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleOnInputChange}
                placeholder="First Name"
              />
              {/* {error.firstName && (
                <span className="error">{error.firstName}</span>
              )} */}
            </div>

            <div className="input-field">
              <input
                className="form-input"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleOnInputChange}
                placeholder="Last Name"
              />
              {/* {error.lastName && (
                <span className="error">{error.lastName}</span>
              )} */}
            </div>
          </div>

          <div className="input-field">
            <label for="password">Password</label>
            <input
              className="form-input"
              name="password"
              type="password"
              value={form.password}
              onChange={handleOnInputChange}
              placeholder="Enter your password"
            />
            {/* {error.password && <span className="error">{error.password}</span>} */}
          </div>

          <div className="input-field">
            <label for="passwordConfirm">Confirm Password</label>
            <input
              className="form-input"
              name="passwordConfirm"
              type="password"
              value={form.passwordConfirm}
              onChange={handleOnInputChange}
              placeholder="Confirm your password"
            />
            {/* {error.passwordConfirm && (
              <span className="error">{error.passwordConfirm}</span>
            )} */}
          </div>
        </form>

        <button
          className="submit-registration main-button"
          onClick={handleOnFormSubmit}
        >
          {isProcessing ? "Loading" : "Create Account"}
        </button>
        <div className="footer">
          <p>
            Already have an account? Log in{" "}
            <Link to="/login" className="inline-link">
              here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
