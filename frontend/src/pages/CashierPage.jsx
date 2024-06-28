/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import ReactToPrint from "react-to-print";

const CashierPage = ({ name }) => {
  const [invoiceNo, setInvoiceNo] = useState("-");
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [qty, setQty] = useState(1);
  // const [price, setPrice] = useState("");
  const [discPercent, setDiscPercent] = useState("");
  const [discMoney, setDiscMoney] = useState("");
  // const [cost, setCost] = useState("");
  const [total, setTotal] = useState("");
  const [payment, setPayment] = useState("Cash");
  const [customers, setCustomers] = useState("");
  const BASE_URL = "http://localhost:4000";

  const [products, setProducts] = useState("");
  const [barcode, setBarcode] = useState("");
  const [sales, setSales] = useState("");
  const [today, setToday] = useState("");
  const [salesOpened, setSalesOpened] = useState(false);

  const [pay, setPay] = useState("");
  const [returnMoney, setReturnMoney] = useState("");

  const ref = useRef();

  const generateInvoiceNumber = () => {
    const fulldate = new Date();
    const year = fulldate.getFullYear();
    const month = fulldate.getMonth() + 1;
    const date = fulldate.getDate();
    const hours = fulldate.getHours();
    const minutes = fulldate.getMinutes();
    const invoiceNumber = `${year}${month}${date}${hours}${minutes}`;
    setInvoiceNo(invoiceNumber);
  };

  const getCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/customers`);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const openSales = () => {
    const date = new Date();
    const today = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    setToday(today);
    setSalesOpened(true);
  };

  const handleUpdateQty = async (prevQty) => {
    await axios.patch(`${BASE_URL}/sales/qty/${productId}`, {
      invoice_no: invoiceNo,
      qty: prevQty + 1,
    });
  };

  const handleUpdateQty2 = async (newQty, productId) => {
    await axios.patch(`${BASE_URL}/sales/qty/${productId}`, {
      invoice_no: invoiceNo,
      qty: newQty,
    });
    getSales();
  };

  const handleUpdateDiscPercent = async (discountPercent, productId) => {
    await axios.patch(`${BASE_URL}/sales/discountpercent/${productId}`, {
      invoice_no: invoiceNo,
      discountPercent: discountPercent,
    });
    getSales();
  };

  const handleUpdateDiscMoney = async (discountMoney, productId) => {
    await axios.patch(`${BASE_URL}/sales/discountmoney/${productId}`, {
      invoice_no: invoiceNo,
      discountMoney: discountMoney,
    });
    getSales();
  };

  const handleSubmit = async () => {
    if (sales.sales) {
      const filteredSales = sales.sales.filter(
        (item) => item.product_id == productId && item.invoice == invoiceNo,
      );
      if (filteredSales.length > 0) {
        handleUpdateQty(filteredSales[0].qty);
      } else {
        try {
          await axios.post(`${BASE_URL}/sales`, {
            invoice_no: invoiceNo,
            sales_admin: name,
            customer_id: customerId,
            product_id: productId,
            qty: qty,
            price: 0,
            disc_percent: discPercent,
            disc_money: discMoney,
            cost: 0,
            total: 0,
            payment: payment,
          });
        } catch (error) {
          console.log(error);
        }
      }
      getSales();
    } else {
      try {
        await axios.post(`${BASE_URL}/sales`, {
          invoice_no: invoiceNo,
          sales_admin: name,
          customer_id: customerId,
          product_id: productId,
          qty: qty,
          price: 0,
          disc_percent: discPercent,
          disc_money: discMoney,
          cost: 0,
          total: 0,
          payment: payment,
        });
        getSales();
      } catch (error) {
        console.log(error);
      }
    }
    getSales();
  };

  const getSales = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/sales/${invoiceNo}`);
      setSales(response.data);
      setTotal(response.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const formattedTotal = total.toLocaleString();

  return (
    <div className="ms-[2rem] w-full overflow-auto px-8 pt-3 sm:ms-[18%] sm:ps-[2rem]">
      <Toaster position="bottom-right" reverseOrder={false} />
      <h1 className="w-fit p-3 text-base font-bold md:text-lg lg:text-xl">
        Cashier
      </h1>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className="btn hover:bg-gray"
          onClick={() => {
            document.getElementById("newSaleModal").showModal();
            generateInvoiceNumber();
            getCustomers();
          }}
        >
          New Sale
        </button>
        <dialog id="newSaleModal" className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Create New Sale</h3>
            <form
              className="w-full p-3"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Invoice Number
              </label>
              <input
                type="text"
                className="input input-bordered mb-3 w-full text-sm"
                value={invoiceNo}
                readOnly
              />
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Sales Admin
              </label>
              <input
                type="text"
                className="input input-bordered mb-3 w-full text-sm"
                value={name}
                readOnly
              />
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Customer
              </label>
              <select
                className="select select-bordered mb-3 w-full text-sm"
                defaultValue={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option disabled>Choose customer</option>
                {customers !== "" &&
                  customers.map((customer, idx) => {
                    return (
                      <option key={idx} value={customer.customer_id}>
                        {customer.firstname} {customer.lastname}
                      </option>
                    );
                  })}
              </select>
              <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                Payment
              </label>
              <select
                className="select select-bordered mb-3 w-full text-sm"
                defaultValue={payment}
                onChange={(e) => setPayment(e.target.value)}
              >
                <option disabled>Choose payment</option>
                <option value="Cash">Cash</option>
                <option value="Qris">Qris</option>
              </select>
            </form>
            <div className="modal-action">
              <form
                method="dialog"
                className="flex w-[100%] justify-end gap-3 px-3"
              >
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
                <button
                  className="btn bg-primary text-white"
                  onClick={() => {
                    openSales();
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </dialog>
        <div className="flex gap-2">
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            placeholder="Barcode"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
          {salesOpened === true ? (
            <>
              <select
                className="select select-bordered w-full max-w-xs"
                defaultValue={productId}
                onChange={(e) => setProductId(e.target.value)}
              >
                {products &&
                  products
                    .filter((item) => {
                      return barcode.toLowerCase() === ""
                        ? null
                        : item.barcode.includes(barcode.toLowerCase());
                    })
                    .map((product, idx) => {
                      return (
                        <option key={idx} value={product.product_id}>
                          {product.name}
                        </option>
                      );
                    })}
              </select>
              <button
                className="btn"
                onClick={() => {
                  handleSubmit();
                }}
              >
                Add
              </button>
            </>
          ) : (
            <>
              <select
                className="select select-bordered w-full max-w-xs"
                disabled
              ></select>
              <button className="btn" disabled>
                Add
              </button>
            </>
          )}
        </div>
        <div className="flex w-full grid-cols-4 flex-wrap gap-3 sm:grid">
          <div className="container col-span-3 overflow-x-auto">
            <table className="table">
              <thead>
                <tr className="border-y-[1px] border-gray bg-primary text-white">
                  <th className="border-x-[1px] border-gray text-center">No</th>
                  <th className="border-r-[1px] border-gray">Prd Name</th>
                  <th className="border-r-[1px] border-gray">Barcode</th>
                  <th className="border-r-[1px] border-gray">Price</th>
                  <th className="border-r-[1px] border-gray text-center">
                    Qty
                  </th>
                  <th className="border-r-[1px] border-gray">Disc. %</th>
                  <th className="border-r-[1px] border-gray">Disc. Rp</th>
                  <th className="border-r-[1px] border-gray">Total</th>
                </tr>
              </thead>
              <tbody>
                {sales.sales &&
                  sales.sales.map((item, idx) => {
                    return (
                      <tr className="hover border-x-[1px]" key={idx}>
                        <th className="border-b-[1px] border-gray text-center font-normal">
                          {idx + 1}
                        </th>
                        <td className="border-x-[1px] border-b-[1px] border-gray">
                          {item.product}
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray">
                          {item.barcode}
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray">
                          {item.price.toLocaleString()}
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray p-0 text-center">
                          <input
                            type="text"
                            className="input max-h-[30px] w-full max-w-[50px]"
                            value={item.qty}
                            onChange={(e) =>
                              handleUpdateQty2(e.target.value, item.product_id)
                            }
                          />
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray">
                          <form
                            action="submit"
                            className="flex items-center justify-center gap-2"
                          >
                            {item.disc_percent > 0 ? (
                              <input
                                type="text"
                                className="input max-h-[30px] w-full max-w-[50px]"
                                value={item.disc_percent}
                                onChange={(e) => {
                                  setDiscPercent(e.target.value);
                                }}
                              />
                            ) : (
                              <input
                                type="text"
                                className="input max-h-[30px] w-full max-w-[50px]"
                                value={discPercent}
                                onChange={(e) => {
                                  setDiscPercent(e.target.value);
                                }}
                              />
                            )}
                            <button
                              id="btnDiscPercent"
                              className="btn h-min min-h-1 border-0 bg-transparent p-1"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateDiscPercent(
                                  discPercent,
                                  item.product_id,
                                );
                                setDiscPercent(0);
                              }}
                            >
                              <FaCheck />
                            </button>
                          </form>
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray">
                          <form
                            action="submit"
                            className="flex items-center justify-center gap-2"
                          >
                            {item.disc_money > 0 ? (
                              <input
                                type="text"
                                className="input max-h-[30px] w-full max-w-[50px]"
                                value={item.disc_money}
                                onChange={(e) => setDiscMoney(e.target.value)}
                              />
                            ) : (
                              <input
                                type="text"
                                className="input max-h-[30px] w-full max-w-[50px]"
                                value={discMoney}
                                onChange={(e) => setDiscMoney(e.target.value)}
                              />
                            )}
                            <button
                              className="btn h-min min-h-1 border-0 bg-transparent p-1"
                              onClick={(e) => {
                                e.preventDefault();
                                handleUpdateDiscMoney(
                                  discMoney,
                                  item.product_id,
                                );
                                setDiscMoney(0);
                              }}
                            >
                              <FaCheck />
                            </button>
                          </form>
                        </td>
                        <td className="border-b-[1px] border-l-[1px] border-gray">
                          {item.total.toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="container card mb-2 max-h-[450px] bg-[#fafafa] shadow-md">
            <div className="tools inline-flex items-center gap-2 p-2">
              <div className="circle">
                <span className="inline-block h-[10px] w-[10px] items-center rounded-[50%] bg-[#ff605c] p-1"></span>
              </div>
              <div className="circle">
                <span className="inline-block h-[10px] w-[10px] items-center rounded-[50%] bg-[#ffbd44] p-1"></span>
              </div>
              <div className="circle">
                <span className="inline-block h-[10px] w-[10px] items-center rounded-[50%] bg-[#00ca4e] p-1"></span>
              </div>
            </div>
            <h2 className="py-2 text-center font-semibold">Sales Details</h2>
            <div id="salesDetails" className="p-2 px-3 text-sm lg:text-base">
              <div className="flex">
                <h3 className="grow basis-1">Admin</h3>
                <h3 className="grow basis-1">: {name}</h3>
              </div>
              <div className="flex">
                <h3 className="grow basis-1">Date</h3>
                {today !== "" ? (
                  <h3 className="grow basis-1">: {today}</h3>
                ) : (
                  <h3 className="grow basis-1">: Today</h3>
                )}
              </div>
              <div className="flex">
                <h3 className="grow basis-1">Invoice Number</h3>
                {invoiceNo !== "" ? (
                  <h3 className="grow basis-1">: {invoiceNo}</h3>
                ) : (
                  <h3 className="grow basis-1">: Invoice</h3>
                )}
              </div>
              <div className="flex">
                <h3 className="grow basis-1">Customer</h3>
                <h3 className="grow basis-1">
                  :
                  {customers &&
                    customers
                      .filter((item) => item.customer_id == customerId)
                      .map((customer) => `: ${customer.firstname}`)}
                </h3>
              </div>
            </div>
            <div id="salesTotal" className="flex flex-col p-2 px-3 text-center">
              <h2 className="py-2 text-center font-semibold">Sales Total</h2>
              <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                <h3>Rp. {formattedTotal}</h3>
              </div>
              <button
                className="btn mt-4 hover:bg-gray"
                onClick={() => {
                  document.getElementById("checkoutModal").showModal();
                }}
              >
                Checkout
              </button>
              <dialog id="checkoutModal" className="modal">
                <div className="modal-box text-start">
                  <h3 className="text-lg font-bold">Checkout</h3>
                  <form
                    className="w-full p-3"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                      Total
                    </label>
                    <input
                      type="text"
                      className="input input-bordered mb-3 w-full text-sm"
                      value={formattedTotal}
                      readOnly
                    />
                    <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                      Pay
                    </label>
                    <input
                      type="number"
                      className="input input-bordered mb-3 w-full text-sm"
                      value={pay}
                      onChange={(e) => {
                        setPay(e.target.value);
                        setReturnMoney(
                          (e.target.value - total).toLocaleString(),
                        );
                      }}
                    />
                    <label className="text-gray-900 mb-2 block text-sm font-medium dark:text-white">
                      Return
                    </label>
                    <input
                      type="text"
                      className="input input-bordered mb-3 w-full text-sm"
                      value={returnMoney}
                      readOnly
                    />
                  </form>
                  <div className="modal-action">
                    <form
                      method="dialog"
                      className="flex w-[100%] justify-end gap-3 px-3"
                    >
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                      <ReactToPrint
                        trigger={() => (
                          <button className="btn bg-primary text-white hover:bg-gray">
                            Print
                          </button>
                        )}
                        content={() => ref.current}
                      />
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
          <div className="col-span-4">
            <h1 className="w-fit p-3 text-base font-bold md:text-lg lg:text-xl">
              Print Preview
            </h1>
            <div id="elementToPrint" className="max-w-[300px] pt-4" ref={ref}>
              <div
                id="storeData"
                className="flex flex-col border-b-[1px] p-2 px-4 text-center"
              >
                <div className="font-bold">Hadi Sport Shop x Orlin Apparel</div>
                <span className="text-sm">
                  Jalan Hasyim Dirjosubroto No.44, Wangandawa, Kec.Talang,
                  Kab.Tegal
                </span>
              </div>
              <div
                id="invoiceData"
                className="flex justify-between gap-4 border-b-[1px] p-2 px-4 text-sm"
              >
                <div>
                  <div>Date</div>
                  <div>No</div>
                  <div>Admin</div>
                  <div>Customer</div>
                </div>
                <div>
                  {today !== "" ? <div>: {today}</div> : <div>: Today</div>}
                  {invoiceNo !== "" ? <div>: {invoiceNo}</div> : <div>: -</div>}
                  <div>: {name}</div>
                  <div>
                    :{" "}
                    {customers &&
                      customers
                        .filter((item) => item.customer_id == customerId)
                        .map((customer) => `: ${customer.firstname}`)}
                  </div>
                </div>
              </div>
              <div id="salesData" className="border-b-[1px] p-2">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Prd Name</th>
                      <th>Discounts</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sales.sales &&
                      sales.sales.map((item, idx) => {
                        if (item.disc_percent == 0 && item.disc_money == 0) {
                          return (
                          <tr key={idx}>
                            <td>{item.product}</td>
                            <td></td>
                            <td className="text-end">{item.total.toLocaleString()}</td>
                          </tr>
                          )
                        } else if (item.disc_percent > 0 && item.disc_money == 0) {
                          return (
                          <tr key={idx}>
                            <td>{item.product}</td>
                            <td>
                              {item.disc_percent}%
                            </td>
                            <td className="text-end">{item.total.toLocaleString()}</td>
                          </tr>)
                        } else if (item.disc_percent == 0 && item.disc_money > 0) {
                          return (
                          <tr key={idx}>
                            <td>{item.product}</td>
                            <td>
                              {item.disc_money.toLocaleString()}
                            </td>
                            <td className="text-end">{item.total.toLocaleString()}</td>
                          </tr>)
                        }
                        return (
                          <tr key={idx}>
                            <td>{item.product}</td>
                            <td>
                              {item.disc_percent}% +{" "}
                              {item.disc_money.toLocaleString()}
                            </td>
                            <td className="text-end">{item.total.toLocaleString()}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div id="total" className="p-2 px-4 text-sm">
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <div>Rp. {formattedTotal}</div>
                </div>
                <div className="flex justify-between">
                  <div>Bayar</div>
                  <div>Rp. {pay.toLocaleString()}</div>
                </div>
                <div className="flex justify-between">
                  <div>Kembalian</div>
                  <div>Rp. {returnMoney}</div>
                </div>
              </div>
              <div className="p-2 px-4 text-center text-sm">
                <div>Barang yang sudah dibeli tidak dapat ditukar kembali</div>
                <div className="font-bold">TERIMA KASIH</div>
                <div className="font-bold">ATAS KUNJUNGAN ANDA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashierPage;
