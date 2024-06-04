/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import ProductsPage from "./ProductsPage";
import CustomersPage from "./CustomersPage";

const Dashboard = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  const { page } = useParams();

  useEffect(() => {
    getRefreshToken();
    getUsers();
  }, []);

  const getRefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        setTimeout(() => navigate("/"), 1000);
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:4000/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

  const getUsers = async () => {
    await axiosJWT.get("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  if (page === "products") {
    return(
      <>
        <Navbar />
        <div className="sidebar-container flex">
          <Sidebar />
          {/* Main content that must be rendered */}
          { page === "products" ? <ProductsPage /> : <h1>blank page</h1> }
        </div>
      </>
    )
  }
  if (page === "customers") {
    return(
      <>
        <Navbar />
        <div className="sidebar-container flex">
          <Sidebar />
          {/* Main content that must be rendered */}
          { page === "customers" ? <CustomersPage /> : <h1>blank page</h1> }
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <div className="sidebar-container flex">
        <Sidebar />
        {/* Main content that must be rendered */}
        <h1>Cashier Page</h1>
      </div>
    </>
  );
};

export default Dashboard;
