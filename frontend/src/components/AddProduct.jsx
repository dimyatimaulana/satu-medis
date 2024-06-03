import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const AddProduct = () => {
  const BASE_URL = "http://localhost:4000";
  const [prdName, setPrdName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [qty, setQty] = useState(null);
  const [price, setPrice] = useState(null);
  const [cost, setCost] = useState(null);
  const navigate = useNavigate();

  const addProduct = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, {
        name: prdName,
        barcode: barcode,
        qty: qty,
        price: price,
        cost: cost,
      });
      toast.success(response.data.message);
      navigate("/products");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

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
              Add Product
            </h1>
          </div>
          <form
            className="w-full sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-[50%] p-3"
            onSubmit={(e) => {
              e.preventDefault();
              addProduct();
            }}
          >
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="Product 1"
              value={prdName}
              required
              onChange={(e) => setPrdName(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Barcode
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="881692003888"
              value={barcode}
              required
              onChange={(e) => setBarcode(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Quantity
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="100"
              value={qty}
              required
              onChange={(e) => setQty(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Price
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="250000"
              value={price}
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Cost
            </label>
            <input
              type="text"
              className="input input-bordered mb-5 h-[2.5rem] w-full text-sm"
              placeholder="150000"
              value={cost}
              required
              onChange={(e) => setCost(e.target.value)}
            />
            <button
              type="submit"
              className="btn hover:bg-primary hover:text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
