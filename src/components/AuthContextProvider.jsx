import { useState, createContext } from "react";

// Create a context
const AuthContext = createContext(null);

// AuthProvider component
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Function to set user when logging in
  const login = (userData) => {
    setUser(userData);
  };

  // Function to clear user when logging out
  const logout = () => {
    setUser(null);
  };

  // Provide the context value to child components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
