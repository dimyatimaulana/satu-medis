import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Products from "./ProductModel.js";
import Customers from "./CustomerModel.js";

const { DataTypes } = Sequelize;

const Sales = db.define(
  "sales",
  {
    sales_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    invoice_no: DataTypes.STRING,
    sales_admin: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    disc_percent: DataTypes.INTEGER,
    disc_money: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    payment: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

Sales.hasOne(Customers, { foreignKey: "customer_id" });
Sales.belongsTo(Customers, { foreignKey: "customer_id" });

Sales.hasOne(Products, { foreignKey: "product_id" });
Sales.belongsTo(Products, { foreignKey: "product_id" });

Sales.removeAttribute("id");
export default Sales;
