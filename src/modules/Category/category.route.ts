import express from "express";
import { CategoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { Role } from "../../../generated/prisma/enums";

const router = express.Router();

// Create category (admin only)
router.post("/", auth(Role.ADMIN), CategoryController.createCategory);

// Get all categories (public)
router.get("/", CategoryController.getCategory);

// Delete category by ID (admin only)
router.delete("/:id", auth(Role.ADMIN), CategoryController.deleteCategory);

// Update category by ID (admin only)
router.patch("/:id", auth(Role.ADMIN), CategoryController.updateCategory);

export const CategoryRoutes = router;
