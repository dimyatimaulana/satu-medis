/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { FaSearch } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const BASE_URL = "http://localhost:4000";
  const [products, setProducts] = useState("");
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/products/${id}`);
      toast.error(response.data.message);
      setTimeout(location.reload(), 1500);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  function Products({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems
            .filter((item) => {
              return search.toLowerCase() === ""
                ? item
                : item.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((product, idx) => (
              <tr key={idx} className="text-sm md:text-base">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.barcode}</td>
                <td>{product.qty}</td>
                <td>{product.price}</td>
                <td>{product.cost}</td>
                <td className="flex gap-3">
                  <button
                    className="btn text-sm hover:bg-primary hover:text-white"
                    onClick={() => navigate(`/products/edit/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn bg-red-500 text-white"
                    onClick={() => deleteProduct(product.id)}
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
    const currentItems = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % products.length;
      setItemOffset(newOffset);
    };

    return (
      <>
        <Products currentItems={currentItems} />
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
    <div className="ms-[2rem] w-full overflow-auto px-8 pt-3 sm:ms-[18%] sm:ps-[2rem]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="w-fit p-3 text-base font-bold md:text-lg lg:text-xl">
        Products
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <div className="input input-bordered flex h-[2.5rem] items-center gap-2">
          <input
            type="text"
            placeholder="Name"
            className="md:text-md text-sm"
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch className="opacity-70 sm:h-4 sm:w-4" />
        </div>
        <button
          className="btn text-sm hover:bg-primary hover:text-white"
          onClick={() => navigate(`/products/add`)}
        >
          Add Product
        </button>
      </div>
      <div className="w-full overflow-auto pt-2">
        <table className="table">
          <thead>
            <tr className="text-sm md:text-base">
              <th>Id</th>
              <th>Name</th>
              <th>Barcode</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Cost</th>
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

export default ProductsPage;
