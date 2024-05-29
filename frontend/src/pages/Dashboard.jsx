import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [users, setUsers] = useState("");
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    getRefreshToken();
    getUsers();
  }, []);

  const getRefreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:4000/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUser(decoded.name);
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
        setUser(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:4000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsers(response.data);
  };

  const editUser = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/users/${id}`, {
        name: name,
        email: email,
        password: password,
      });
      toast.success(response.data.message);
      location.reload();
      setUserId("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/users/${id}`);
      toast.success(response.data.message);
      setTimeout(() => location.reload(), 1000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Navbar name={user} />
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="h-screen pt-5 px-8">
        <div className="overflow-x-auto">
          <table className="table max-w-screen-lg">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, idx) => (
                  <tr key={user.id}>
                    <td>{idx + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="flex gap-4">
                      <button
                        className="btn"
                        onClick={() => {
                          document.getElementById("editUser").showModal();
                          setUserId(user.id);
                        }}
                      >
                        Edit
                      </button>
                      <dialog id="editUser" className="modal">
                        <div className="modal-box">
                          <h3 className="font-bold text-lg">Edit User</h3>
                          <form
                            action="submit"
                            className="flex flex-col items-center"
                          >
                            <div className="w-full max-w-xs">
                              <label
                                htmlFor="name"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                className="input input-bordered w-full max-w-xs mb-3"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                              <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                className="input input-bordered w-full max-w-xs mb-3"
                                placeholder="johndoe@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                              >
                                Password
                              </label>
                              <input
                                type="password"
                                className="input input-bordered w-full max-w-xs mb-3"
                                placeholder="•••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => editUser(userId)}
                              className="bg-primary w-full text-white max-w-xs"
                            >
                              Submit
                            </button>
                          </form>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                          <button className="bg-transparent">close</button>
                        </form>
                      </dialog>
                      <button
                        className="btn bg-red-500 text-white"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
