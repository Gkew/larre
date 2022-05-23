import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [password, setPassword] = useState(null);

  const login = (admin) => {
    setAdmin(admin);
    setPassword(password);
  };

  const logout = () => {
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticate = () => {
  return useContext(AuthContext);
};
