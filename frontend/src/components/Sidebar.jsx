import { FaShoppingCart, FaUsers } from "react-icons/fa";
import {
  FaShop,
  FaBoxesStacked,
  FaFileLines,
  FaChartSimple,
} from "react-icons/fa6";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { page } = useParams();
  const { id } = useParams();
  const url = window.location.href;
  return (
    <div className="fixed bottom-0 top-[80px] shadow-md sm:min-w-[15%]">
      <ul className="flex flex-col gap-4 p-2">
        <li
          className={
            page === "cashier"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a
            href="/cashier"
            className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit"
          >
            <FaShop />
            <p className="hidden sm:block">Cashier</p>
          </a>
        </li>
        <li
          className={
            page === "products" ||
            id !== undefined ||
            url === "http://localhost:5173/products/add"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a
            href="/products"
            className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit"
          >
            <FaBoxesStacked />
            <p className="hidden sm:block">Products</p>
          </a>
        </li>
        <li
          className={
            page === "customers"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a
            href="/customers"
            className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit"
          >
            <FaUsers />
            <p className="hidden sm:block">Customers</p>
          </a>
        </li>
        <li
          className={
            page === "reports"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit">
            <FaFileLines />
            <p className="hidden sm:block">Reports</p>
          </a>
        </li>
        <li
          className={
            page === "charts"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit">
            <FaChartSimple />
            <p className="hidden sm:block">Charts</p>
          </a>
        </li>
        <li
          className={
            page === "sales"
              ? "flex rounded-md bg-primary text-white"
              : "flex rounded-md"
          }
        >
          <a className="flex w-full items-center gap-2 p-2 sm:ps-4 text-inherit hover:text-inherit">
            <FaShoppingCart />
            <p className="hidden sm:block">Sales</p>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
