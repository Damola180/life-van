import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });

  const [errorCode, setErrorCode] = React.useState();

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  function handleSubmit(e) {
    console.log("login is working");
    e.preventDefault();

    const auth = getAuth();
    const email = loginFormData.email;
    const password = loginFormData.password;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(user));
        login(email);
        navigate("/host", { replace: true });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode);

        console.log(errorMessage);
        setErrorCode(errorCode);
      });
  }

  function handleChange(params) {
    const { name, value } = params.target;

    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      <h3 className="login-error">error.message</h3>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button>Log In</button>
      </form>

      <p>If you dont have an account</p>
      <form action="">
        <Link to="/signup">
          <button> Sign up for an account</button>
        </Link>
      </form>

      <p> {errorCode}</p>
    </div>
  );
}
