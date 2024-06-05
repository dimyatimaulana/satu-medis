import Sales from "../models/SalesModel.js";
import Products from "../models/ProductModel.js";
import Customers from "../models/CustomerModel.js";

export const createSales = async (req, res) => {
  const {
    invoice_no,
    sales_admin,
    customer_id,
    product_id,
    qty,
    price,
    disc_percent,
    disc_money,
    cost,
    total,
    payment,
  } = req.body;
  try {
    await Sales.create({
      invoice_no: invoice_no,
      sales_admin: sales_admin,
      customer_id: customer_id,
      product_id: product_id,
      qty: qty,
      price: price,
      disc_percent: disc_percent,
      disc_money: disc_money,
      cost: cost,
      total: total,
      payment: payment,
    });
    res.json({ message: "Sales created" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to create sales" });
  }
};

export const getSales = async (req, res) => {
  const { invoice_no } = req.body;
  const sales = await Sales.findOne({
    where: {
      invoice_no: invoice_no
    },
    include: [
      {
        model: Products,
      },
      {
        model: Customers
      }
    ],
  });
  res.json(sales);
};
