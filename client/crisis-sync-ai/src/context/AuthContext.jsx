import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // important

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await api.get("/api/auth/me");
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // ✅ Login (frontend state only)
  const login = (email, role) => {
    setUser({ email, role });
  };

  // ✅ Logout (backend + frontend)
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (err) {
      console.log(err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}