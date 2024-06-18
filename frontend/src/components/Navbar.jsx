import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// eslint-disable-next-line react/prop-types
const Navbar = () => {
  const [user, setUser] = useState("");
  const getRefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/token");
      const decoded = jwtDecode(response.data.accessToken);
      setUser(decoded.name);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };
  useEffect(() => {
    getRefreshToken();
  }, []);

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.delete("http://localhost:4000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar sticky left-0 right-0 top-0 z-10 bg-base-100 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Satu Medis</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal items-center gap-3 px-1">
          <li className="flex">
            <div className="hidden sm:flex justify-center items-center">
              <FaUser className="text-primary" />
              <p className="text-primary font-semibold">{user}</p>
            </div>
            <details className="sm:hidden">
              <summary>
                <FaUser />
              </summary>
              <ul className="rounded-t-none bg-base-100 p-2">
                <li>
                  <a className="text-primary">{user}</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <button className="btn" onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
