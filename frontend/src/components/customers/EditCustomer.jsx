import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const EditCustomer = () => {
  const BASE_URL = "http://localhost:4000";
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const navigate = useNavigate();

  const getCustomer = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customers/${id}`);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
      setAddress(response.data.address);
      setPhone(response.data.phone);
      setWhatsapp(response.data.whatsapp);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const editCustomer = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/customers/${id}`, {
        firstname: firstname,
        lastname: lastname,
        address: address,
        phone: phone,
        whatsapp: whatsapp,
      });
      toast.success(response.data.message, {
        duration: 5000,
      });
      navigate("/customers");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getCustomer();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="sidebar-container flex">
        <Sidebar />
        <div className="ms-[2rem] w-full overflow-auto px-8 pt-3 sm:ms-[18%] sm:ps-[2rem]">
          <Toaster position="bottom-right" reverseOrder={false} />
          <div className="flex items-center">
            <IoArrowBack
              onClick={() => history.back()}
              className="hover:cursor-pointer"
            />
            <h1 className="w-fit p-3 text-base font-bold md:text-lg lg:text-xl">
              Edit Customer
            </h1>
          </div>
          <form className="w-full p-3 sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-[50%]">
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              First Name
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="John"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Last Name
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="Doe"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Address
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="South Jakarta, Jakarta"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="08xxxxxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Whatsapp
            </label>
            <input
              type="text"
              className="input input-bordered mb-5 h-[2.5rem] w-full text-sm"
              placeholder="08xxxxxxxxxx"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            <button
              className="btn hover:bg-primary hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                editCustomer();
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
