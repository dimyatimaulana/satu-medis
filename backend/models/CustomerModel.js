import { Sequelize } from "sequelize";
import db from "../config/database.js";
// import Sales from "./SalesModel.js";

const { DataTypes } = Sequelize;

const Customers = db.define(
  "customers",
  {
    customer_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    whatsapp: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

// Customers.hasMany(Sales, {
//   foreignKey: "customerId",
// });

Customers.removeAttribute("id");
export default Customers;
