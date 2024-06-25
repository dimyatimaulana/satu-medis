import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import HadiSport from "../assets/hadi-sport-orlin.jpg";
import LoginHero from "../assets/login-hero.webp";
import { IoMail } from "react-icons/io5";
import { FaLock } from "react-icons/fa";

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
      setTimeout(() => navigate("/cashier"), 1000);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div id="" className="flex h-screen w-full grid-cols-2 bg-white lg:grid">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        action="submit"
        onSubmit={login}
        className="col-span-1 m-auto flex flex-col justify-center rounded-md border border-primary p-5 shadow-lg lg:gap-6 lg:border-0 lg:shadow-none"
      >
        <h1 className="mb-3 text-center text-xl font-semibold lg:text-start lg:text-[32px]">
          Welcome Back
        </h1>
        <h1 className="mb-5 text-center text-base lg:text-start lg:text-[24px]">
          Login to your account
        </h1>
        <label className="input input-bordered mb-3 flex items-center gap-3 text-deepBlue lg:min-w-[400px]">
          <IoMail />
          <input
            type="email"
            id="email"
            className="grow"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered mb-3 flex items-center gap-3 text-deepBlue">
          <FaLock />
          <input
            type="password"
            id="password"
            className="grow"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="mb-5 justify-between ps-2 text-[12px] md:text-[14px] lg:flex lg:text-[18px]">
          <p>
            Don{"'"}t have an account yet?{" "}
            <a
              href="/register"
              className="font-semibold text-primary decoration-solid hover:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="btn w-full rounded-[25px] border-0 bg-gradient-to-r from-deepBlue from-20% to-[#3953d4] text-white shadow-md lg:text-[18px]"
          id="loginBtn"
        >
          Login
        </button>
      </form>
      <div className="hero-img col-span-1 hidden items-center justify-center lg:flex">
        <img
          src={LoginHero}
          alt="hero"
          className="max-h-[95vh] rounded-[40px] bg-primary"
        />
      </div>
    </div>
  );
};

export default Login;
