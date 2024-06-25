import Sales from "../models/SalesModel.js";
import Products from "../models/ProductModel.js";
import Customers from "../models/CustomerModel.js";
import dayjs from "dayjs";

export const createSales = async (req, res) => {
  const {
    invoice_no,
    sales_admin,
    customer_id,
    product_id,
    qty,
    disc_percent,
    disc_money,
    payment,
  } = req.body;
  try {
    const product = await Products.findOne({
      where: {
        product_id: product_id,
      },
    });
    if (!product) return;
    console.log(product);
    await Sales.create({
      invoice_no: invoice_no,
      sales_admin: sales_admin,
      customer_id: customer_id,
      product_id: product_id,
      qty: qty,
      price: product.price,
      disc_percent: disc_percent,
      disc_money: disc_money,
      cost: product.cost,
      total: qty * product.price,
      payment: payment,
    });
    res.json({ message: "Sales created" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to create sales" });
  }
};

export const updateSales = async (req, res) => {
  const { invoice_no, qty } = req.body;
  const sales = Sales.findOne({
    where: {
      invoice_no: invoice_no,
      product_id: req.params.id,
    },
  });
  if (!sales) return res.status(404).json({ message: "Sales is not found" });
  try {
    await Sales.update(
      {
        qty: qty,
      },
      {
        where: {
          invoice_no: invoice_no,
          product_id: req.params.id,
        },
      }
    );
    // const updatedSales = Sales.findOne({
    //   where: {
    //     invoice_no: invoice_no,
    //     product_id: req.params.id,
    //   },
    // });
    res.status(200).json({ message: "Qty updated" });
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscountMoney = async (req, res) => {
  const { invoice_no, discountMoney } = req.body;
  const sales = Sales.findOne({
    where: {
      invoice_no: invoice_no,
      product_id: req.params.id,
    },
  });
  if (!sales) return res.status(404).json({ message: "Sales is not found" });
  try {
    await Sales.update(
      {
        disc_money: discountMoney,
      },
      {
        where: {
          invoice_no: invoice_no,
          product_id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Discount updated" });
  } catch (error) {
    console.log(error);
  }
};

export const updateDiscountPercent = async (req, res) => {
  const { invoice_no, discountPercent } = req.body;
  const sales = Sales.findOne({
    where: {
      invoice_no: invoice_no,
      product_id: req.params.id,
    },
  });
  if (!sales) return res.status(404).json({ message: "Sales is not found" });
  try {
    await Sales.update(
      {
        disc_percent: discountPercent,
      },
      {
        where: {
          invoice_no: invoice_no,
          product_id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: "Discount updated" });
  } catch (error) {
    console.log(error);
  }
};

export const getSales = async (req, res) => {
  const sales = await Sales.findAll({
    where: {
      invoice_no: req.params.invoice,
    },
    include: [
      {
        model: Products,
      },
      {
        model: Customers,
      },
    ],
  });
  const formattedSales = sales.map((item) => {
    const dt = dayjs(item.updatedAt);
    const formattedDate = dt.format("DD-MM-YYYY");
    if (
      (item.disc_percent && item.disc_money == 0) ||
      item.disc_money == null
    ) {
      let customer = "Customer";
      if (item.customer) {
        customer = `${item.customer.firstname} ${item.customer.lastname}`;
      }
      const discount =
        (item.qty * item.product.price * item.disc_percent) / 100;
      const total = item.qty * item.product.price - discount;
      const sale = {
        sales_id: item.sales_id,
        invoice: item.invoice_no,
        customer: customer,
        product_id: item.product.product_id,
        product: item.product.name,
        barcode: item.product.barcode,
        qty: item.qty,
        price: item.product.price,
        total: total,
        disc_percent: item.disc_percent,
        disc_money: item.disc_money,
        payment: item.payment,
        date: formattedDate,
      };
      return sale;
    }
    if (
      (item.disc_money && item.disc_percent == 0) ||
      item.disc_percent == null
    ) {
      let customer = "Customer";
      if (item.customer) {
        customer = `${item.customer.firstname} ${item.customer.lastname}`;
      }
      const total = item.qty * item.product.price - item.disc_money;
      const sale = {
        sales_id: item.sales_id,
        invoice: item.invoice_no,
        customer: customer,
        product_id: item.product.product_id,
        product: item.product.name,
        barcode: item.product.barcode,
        qty: item.qty,
        price: item.product.price,
        total: total,
        disc_percent: item.disc_percent,
        disc_money: item.disc_money,
        payment: item.payment,
        date: formattedDate,
      };
      return sale;
    }
    if (item.disc_percent && item.disc_money) {
      let customer = "Customer";
      if (item.customer) {
        customer = `${item.customer.firstname} ${item.customer.lastname}`;
      }
      const discountPercent =
        (item.qty * item.product.price * item.disc_percent) / 100;
      const total =
        item.qty * item.product.price - discountPercent - item.disc_money;
      const sale = {
        sales_id: item.sales_id,
        invoice: item.invoice_no,
        customer: customer,
        product_id: item.product.product_id,
        product: item.product.name,
        barcode: item.product.barcode,
        qty: item.qty,
        price: item.product.price,
        total: total,
        disc_percent: item.disc_percent,
        disc_money: item.disc_money,
        payment: item.payment,
        date: formattedDate,
      };
      return sale;
    }
    const total = item.qty * item.product.price;
    let customer = "Customer";
    if (item.customer) {
      customer = `${item.customer.firstname} ${item.customer.lastname}`;
    }
    const sale = {
      sales_id: item.sales_id,
      invoice: item.invoice_no,
      customer: customer,
      product_id: item.product.product_id,
      product: item.product.name,
      barcode: item.product.barcode,
      qty: item.qty,
      price: item.product.price,
      total: total,
      disc_percent: item.disc_percent,
      disc_money: item.disc_money,
      payment: item.payment,
      date: formattedDate,
    };
    return sale;
  });
  const prices = formattedSales.map((item) => item.total);
  const total = prices.reduce((acc, curr) => acc + curr);
  res.json({ sales: formattedSales, total: total });
};

export const getOneSales = async (req, res) => {
  try {
    const sales = await Sales.findOne({
      where: {
        sales_id: req.params.id,
      },
      include: [
        {
          model: Products,
        },
        {
          model: Customers,
        },
      ],
    });
    if (!sales) return res.status(404).json({ message: "Sale is not found" });
    let customer = "Customer";
    if (sales.customer) {
      customer = `${sales.customer.firstname} ${sales.customer.lastname}`;
    }
    const total = sales.qty * sales.product.price;
    const dt = dayjs(sales.updatedAt);
    const formattedDate = dt.format("DD-MM-YYYY");
    res.json({
      sales_id: sales.sales_id,
      invoice: sales.invoice_no,
      customer: customer,
      product_id: sales.product.product_id,
      product: sales.product.name,
      barcode: sales.product.barcode,
      qty: sales.qty,
      price: sales.product.price,
      total: total,
      disc_percent: sales.disc_percent,
      disc_money: sales.disc_money,
      payment: sales.payment,
      date: formattedDate,
    });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to get sales" });
  }
};
