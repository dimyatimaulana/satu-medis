import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
const Navbar = ({ name }) => {
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
    <div className="navbar bg-base-100 top-0 sticky shadow-md z-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Satu Medis</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <div><FaUser /> {name}</div>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
