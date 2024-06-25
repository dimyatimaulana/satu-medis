import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SignupHero from "../assets/register-hero.webp";

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
    <div id="" className="flex h-screen w-full grid-cols-2 bg-white lg:grid">
      <Toaster position="top-center" reverseOrder={false} />
      <form
        action="submit"
        onSubmit={register}
        className="col-span-1 m-auto flex flex-col justify-center rounded-md border border-primary p-5 shadow-lg lg:border-0 lg:shadow-none"
      >
        <div className="flex flex-col gap-3">
          <h1 className="mb-3 text-center text-xl font-semibold lg:text-start lg:text-[32px]">
            Register
          </h1>
          <h1 className="mb-5 text-center text-base lg:text-start lg:text-[24px]">
            Please sign up to use our services
          </h1>
        </div>
        <label
          htmlFor="name"
          className="text-gray-900 dark:text-whitetext-[12px] mb-2 block text-sm font-medium md:text-[14px] lg:text-[18px]"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          className="input input-bordered mb-3 w-full"
          placeholder="John Doe"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label
          htmlFor="email"
          className="text-gray-900 mb-2 block text-[12px] text-sm font-medium md:text-[14px] lg:text-[18px] dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="input input-bordered mb-3 w-full"
          placeholder="johndoe@company.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          htmlFor="password"
          className="text-gray-900 mb-2 block text-[12px] text-sm font-medium md:text-[14px] lg:text-[18px] dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="input input-bordered mb-3 w-full"
          placeholder="•••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label
          htmlFor="password"
          className="text-gray-900 mb-2 block text-[12px] font-medium md:text-[14px] lg:text-[18px] dark:text-white"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confPassword"
          className="input input-bordered mb-8 w-full"
          placeholder="•••••••••"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="mb-5 justify-between ps-2 text-[12px] md:text-[14px] lg:flex lg:text-[18px]">
          <p>
            Back to{" "}
            <a
              href="/"
              className="font-semibold text-primary decoration-solid hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
        <button
          type="submit"
          className="btn mt-3 w-full rounded-[25px] border-0 bg-gradient-to-r from-deepBlue from-20% to-[#3953d4] text-white shadow-md lg:text-[18px]"
          id="signupBtn"
        >
          Register
        </button>
      </form>
      <div className="hero-img col-span-1 hidden items-center justify-center lg:flex">
        <img
          src={SignupHero}
          alt="hero"
          className="max-h-[95vh] rounded-[40px] bg-primary"
        />
      </div>
    </div>
  );
};

export default Register;
