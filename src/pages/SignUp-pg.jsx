import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/AuthContextProvider";

export default function SignUp() {
  const [signUpFormData, setsignUpFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [errorCode, setErrorCode] = React.useState();
  const signUpFunction = (event) => {
    event.preventDefault();
    const auth = getAuth();
    const email = signUpFormData.email;
    const password = signUpFormData.password;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        // ...
        // Save user data to localStorage
        localStorage.setItem("userData", JSON.stringify(user));
        console.log(user);
        login(email);
        navigate("/host", { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;

        console.log(errorCode);
        setErrorCode(errorCode);
        // ..
      });
  };

  function handleChange(params) {
    const { name, value } = params.target;

    setsignUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  return (
    <>
      <h1> Create an Account</h1>
      <form onSubmit={signUpFunction} className="login-form">
        <input
          name="email"
          type="email"
          placeholder="Email address"
          value={signUpFormData.email}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={signUpFormData.password}
          onChange={handleChange}
        />
        <button>SIGN UP</button>
      </form>

      <p>{errorCode}</p>
    </>
  );
}
