import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js";
import router from "./routes/routes.js";
// import Products from "./models/ProductModel.js";
// import Customers from "./models/CustomerModel.js";
const app = express();
dotenv.config();

try {
  await db.authenticate();
  console.log("Database connected...");
  // create products table if not exist
  // await Products.sync()
  // await Customers.sync()
} catch (error) {
  console.error(error);
}

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
