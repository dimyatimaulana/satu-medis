/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomersPage = () => {
  const BASE_URL = "http://localhost:4000";
  const [customers, setCustomers] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/customers/${id}`);
      toast.error(response.data.message);
      setTimeout(location.reload(), 1500);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  function Customers({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.firstname.toLowerCase().includes(search.toLowerCase());
            })
            .map((customer, idx) => (
              <tr key={idx} className="text-sm md:text-base">
                <td>{customer.customer_id}</td>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{customer.whatsapp}</td>
                <td className="flex gap-3">
                  <button
                    className="btn"
                    onClick={() => navigate(`/customers/edit/${customer.customer_id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => deleteCustomer(customer.customer_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = customers.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(customers.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % customers.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Customers currentItems={currentItems} />
        <tr>
          <td></td>
          <td></td>
          <td>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              className="mt-4 flex justify-center gap-4 text-center"
              pageClassName="rounded-[5px] text-base flex items-center justify-center"
              pageLinkClassName="py-3 px-4"
              activeClassName="bg-primary"
              activeLinkClassName="text-white"
              previousClassName="rounded-[5px] flex items-center justify-center"
              previousLinkClassName="px-4 py-3 text-base"
              nextClassName="rounded-[5px] flex items-center justify-center"
              nextLinkClassName="px-4 py-3 text-base"
            />
          </td>
        </tr>
      </>
    );
  }

  return (
    <div className="ms-[2rem] w-full overflow-auto px-8 pt-3 sm:ms-[15%] sm:ps-[2rem]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="w-fit p-3 text-base font-bold md:text-lg lg:text-xl">
        Customers
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <div className="input input-bordered flex h-[2.5rem] items-center gap-2">
          <input
            type="text"
            placeholder="First Name"
            className="md:text-md text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="opacity-70 sm:h-4 sm:w-4" />
        </div>
        <button
          className="btn"
          onClick={() => navigate(`/customers/add`)}
        >
          Add Customer
        </button>
      </div>
      <div className="w-full overflow-auto pt-2">
        <table className="table">
          <thead>
            <tr className="text-sm md:text-base">
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Whatsapp</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <PaginatedItems itemsPerPage={5} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;
