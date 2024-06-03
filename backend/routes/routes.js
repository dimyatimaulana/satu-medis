import express from "express";
import { getUsers, register, login, logout, updateUser, deleteUser } from "../controllers/UserController.js";
import { getProducts, createProducts, updateProduct, deleteProduct } from "../controllers/ProductController.js";
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
router.post("/products", createProducts);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

export default router;
