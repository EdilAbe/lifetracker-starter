import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = React.useState({
    email: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });
  const {
    setInitialized,
    setUser,
    setIsAuthorized,
    isProcessing,
    setIsProcessing,
  } = useAuthContext;

  const handleOnInputChange = (event) => {
    if (event.target.name === "email") {
      if (event.target.value.indexOf("@") === -1) {
        setErrors((e) => ({ ...e, email: "Please enter a valid email." }));
      } else {
        setErrors((e) => ({ ...e, email: null }));
      }
    }

    if (event.target.name === "lastName") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({ ...e, lastName: "Please enter your last name." }));
      } else {
        setErrors((e) => ({ ...e, lastName: null }));
      }
    }

    if (event.target.name === "username") {
      if (event.target.value.length === 0) {
        setErrors((e) => ({ ...e, username: "Please enter your username." }));
      } else {
        setErrors((e) => ({ ...e, username: null }));
      }
    }

    if (event.target.name === "password") {
      if (form.passwordConfirm && form.passwordConfirm !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }
    if (event.target.name === "passwordConfirm") {
      if (form.password && form.password !== event.target.value) {
        setErrors((e) => ({
          ...e,
          passwordConfirm: "Password's do not match",
        }));
      } else {
        setErrors((e) => ({ ...e, passwordConfirm: null }));
      }
    }

    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnFormSubmit = async (event) => {
    //setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    if (form.passwordConfirm !== form.password) {
      setErrors((e) => ({ ...e, passwordConfirm: "Passwords do not match." }));
      //setIsProcessing(false);
      return;
    } else {
      setErrors((e) => ({ ...e, passwordConfirm: null }));
    }

    const { data, error } = await apiClient.signup({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.username,
    });
    if (error) {
      setErrors((e) => ({ ...e, form: error }));
      // setIsProcessing(false);
    }
    if (data?.user) {
      setInitialized(data);
      setUser(data.user);
      setIsAuthorized(true);
      apiClient.setToken(data.token);

      navigate("/activity");
      // setIsProcessing(false);
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
