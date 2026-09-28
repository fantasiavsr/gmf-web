import { createContext, useContext, useState, useEffect } from "react";
import { getUser as fetchUser, logout as logoutApi } from "../services/api/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Validate token on app initialization
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem("authToken");
      const storedAuthFlag = localStorage.getItem("isAuthenticated");

      if (storedToken && storedAuthFlag === "true") {
        try {
          const response = await fetchUser();
          setUser(response.user);
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (err) {
          // Token is invalid or expired, clear it
          console.log("Token validation failed, clearing auth state");
          localStorage.removeItem("authToken");
          localStorage.removeItem("isAuthenticated");
          setUser(null);
          setToken(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = (authToken, userData) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("isAuthenticated", "true");
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout API call failed:", err);
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("isAuthenticated");
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
