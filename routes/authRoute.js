import express from "express";
const router = express.Router();
import AuthController from "../controllers/authController.js";
const authController  = new AuthController();

router.post("/login", authController.login);

export default router;