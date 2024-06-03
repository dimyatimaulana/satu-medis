import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    name: DataTypes.STRING,
    barcode: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Products;