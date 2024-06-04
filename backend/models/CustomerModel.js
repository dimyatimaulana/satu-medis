import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Customers = db.define(
  "customers",
  {
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

export default Customers;