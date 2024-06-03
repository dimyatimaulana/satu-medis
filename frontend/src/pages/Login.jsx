import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: email,
        password: password,
      });
      toast.success(response.data.message);
      setTimeout(() => navigate("/products"), 1000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div id="" className="bg-slate-400 w-full h-screen flex">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        action="submit"
        onSubmit={login}
        className="bg-white p-5 rounded-md m-auto flex flex-col"
      >
        <h1 className="text-center font-bold">Login</h1>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input input-bordered w-full max-w-xs mb-3"
          placeholder="johndoe@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input input-bordered w-full max-w-xs mb-5"
          placeholder="•••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="lg:flex justify-between text-[12px] md:text-[14px] mb-5">
          <p>
            Belum punya akun ?{" "}
            <a href="/register" className="text-primary font-semibold">
              Daftar
            </a>
          </p>
        </div>
        <button type="submit" className="w-full bg-primary text-white">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
