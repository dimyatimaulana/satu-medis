import { Sequelize } from "sequelize";
import db from "../config/database.js";
// import Sales from "./SalesModel.js";

const { DataTypes } = Sequelize;

const Products = db.define(
  "products",
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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

// Products.hasMany(Sales, {
//   foreignKey: "prdId",
// });

Products.removeAttribute("id");
export default Products;
