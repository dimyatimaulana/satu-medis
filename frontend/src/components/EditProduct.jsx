import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const EditProduct = () => {
  const BASE_URL = "http://localhost:4000";
  const { id } = useParams();
  const [prdName, setPrdName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [qty, setQty] = useState(null);
  const [price, setPrice] = useState(null);
  const [cost, setCost] = useState(null);
  const navigate = useNavigate();

  const editProduct = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/products/${id}`, {
        name: prdName,
        barcode: barcode,
        qty: qty,
        price: price,
        cost: cost,
      });
      toast.success(response.data.message, {
        duration: 5000,
      });
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
              Edit Product
            </h1>
          </div>
          <form className="w-full sm:w-[75%] md:w-[65%] lg:w-[55%] xl:w-[50%] p-3">
            <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
              Name
            </label>
            <input
              type="text"
              className="input input-bordered mb-3 h-[2.5rem] w-full text-sm"
              placeholder="Product 1"
              value={prdName}
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
              onChange={(e) => setCost(e.target.value)}
            />
            <button
              className="btn hover:bg-primary hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                editProduct();
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

export default EditProduct;
