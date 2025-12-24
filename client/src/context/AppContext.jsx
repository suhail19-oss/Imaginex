import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(backendURL + "/api/user/credits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to load credits");
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again");
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/image/generate`,
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadCreditsData();

      return {
        success: true,
        image: data.resultImage,
      };
    } catch (error) {
      const status = error.response?.status;
      const responseData = error.response?.data;

      if (status === 403) {
        loadCreditsData();
        toast.error(responseData?.message || "Insufficient credits");

        return {
          success: false,
          creditBalance: 0,
        };
      }

      toast.error(responseData?.message || "Image generation failed");
      return { success: false };
    }
  };

  useEffect(() => {
    if (!token) return;
    loadCreditsData();
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
