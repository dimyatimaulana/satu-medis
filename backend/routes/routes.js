import express from "express";
import { getUsers, register, login, logout, updateUser, deleteUser } from "../controllers/UserController.js";
import { getProducts, getOneProduct, createProducts, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import { getCustomers, getOneCustomer, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomersController.js";
import { getSales, createSales, updateSales, getOneSales, updateDiscountPercent, updateDiscountMoney, deleteSales } from "../controllers/SalesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

const router = express.Router();

router.get("/users", verifyToken, getUsers);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

router.get("/products", getProducts);
router.get("/products/:id", getOneProduct);
router.post("/products", createProducts);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/customers", getCustomers);
router.get("/customers/:id", getOneCustomer);
router.post("/customers", createCustomer);
router.patch("/customers/:id", updateCustomer);
router.delete("/customers/:id", deleteCustomer);

// router.post("/sales", getSales);
router.get("/sales/:invoice", getSales);
router.get("/getonesales/:id", getOneSales);
router.post("/sales", createSales);
router.patch("/sales/qty/:id", updateSales);
router.patch("/sales/discountpercent/:id", updateDiscountPercent);
router.patch("/sales/discountmoney/:id", updateDiscountMoney);
router.delete("/sales/:id", deleteSales);

export default router;
