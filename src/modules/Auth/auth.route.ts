import express from "express";
import { AuthController } from "./auth.controller";

const router = express.Router();

// User registration
router.post("/register", AuthController.createUser);

// User login
router.post("/login", AuthController.loginUser);

export const AuthRoutes = router;
