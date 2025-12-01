import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    setUser(res.data.user);
  };

  const login = async (data, guestCart = []) => {
    const res = await api.post("/auth/login", { ...data, guestCart });
    setUser(res.data.user);
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
