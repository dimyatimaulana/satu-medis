import express from "express";
import { getUsers, register, login, logout, updateUser, deleteUser } from "../controllers/UserController.js";
import { getProducts, getOneProduct, createProducts, updateProduct, deleteProduct } from "../controllers/ProductController.js";
import { getCustomers, getOneCustomer, createCustomer, updateCustomer, deleteCustomer } from "../controllers/CustomersController.js";
import { getSales, createSales } from "../controllers/SalesController.js";
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

router.get("/sales", getSales);
router.get("/sales/:id", getSales);
router.post("/sales", createSales);

export default router;
