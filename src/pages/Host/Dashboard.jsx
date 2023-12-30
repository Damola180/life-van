import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../components/AuthContextProvider"; // Three levels up to the 'components' directory
import { getAuth, signOut } from "firebase/auth";
export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  function handleLogOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("userData");

        logout();
        navigate("/");
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <h1>Dashboard running here</h1>
      <button onClick={handleLogOut}>Logout</button>
    </>
  );
}
