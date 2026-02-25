import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

// User registration
router.post("/register", AuthController.createUser);

// User login
router.post("/login", AuthController.loginUser);
router.get("/me",auth(Role.ADMIN,Role.CUSTOMER,Role.SELLER),  AuthController.getUserProfile);
router.patch("/me",auth(Role.ADMIN,Role.CUSTOMER,Role.SELLER),  AuthController.updateUserProfile);
export const AuthRoutes = router;
