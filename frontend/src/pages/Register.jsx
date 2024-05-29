import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/users", {
        name: name,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      toast.success(response.data.message);
      setTimeout(() => navigate("/"), 1000);
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
        onSubmit={register}
        className="bg-white p-5 rounded-md m-auto flex flex-col"
      >
        <h1 className="text-center font-bold">Register</h1>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="input input-bordered w-full max-w-xs mb-3"
          placeholder="johndoe@company.com"
          required
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
          id="email"
          className="input input-bordered w-full max-w-xs mb-3"
          placeholder="johndoe@company.com"
          required
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
          id="password"
          className="input input-bordered w-full max-w-xs mb-3"
          placeholder="•••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confPassword"
          className="input input-bordered w-full max-w-xs mb-8"
          placeholder="•••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-primary text-white">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
