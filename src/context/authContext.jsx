import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
import { loginService, logoutService, verifyTokenRequest } from "../services/auth";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);


  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


  const signin = async (data) => {
    const res = await loginService(data);
    if (res.status === 200){
      let accessToken = res.data.access;
      let refreshToken = res.data.refresh
      Cookies.set('access_token', accessToken, { expires: 7 });
      Cookies.set('refresh_token', refreshToken, { expires: 7 });
      setIsAuthenticated(true);
    }else{
      const errorList = [res.data.message]
      setErrors(errorList);
    }
  };

  const logout = async() => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    setIsAuthenticated(false);
  };
 
  
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.access_token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest();
        if (res.status === 200){
          setIsAuthenticated(true);
          setLoading(false);
        }else{
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);
  

  return (
    <AuthContext.Provider
      value={{
        signin,
        logout,
        isAuthenticated,
        loading,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;