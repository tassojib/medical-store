import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      throw new Error("Unauthorized!");
    }

    // Call service to create category
    const result = await CategoryService.createCategory(req.body);

    // Send standardized response
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Category created",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};

const getCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Fetch all categories
    const result = await CategoryService.getCategory();

    // Send standardized response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get category ID from params
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    // Validate ID
    if (!id || !id.trim()) {
      throw new Error("Category id is required");
    }

    // Call service to delete category
    const result = await CategoryService.deleteCategory(id);

    // Send standardized response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};

const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get category ID from params
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    // Validate ID
    if (!id || !id.trim()) {
      throw new Error("Category id is required");
    }

    // Validate new category name
    if (!req.body.name || !req.body.name.trim()) {
      throw new Error("Category name is required");
    }

    // Call service to update category
    const result = await CategoryService.updateCategory(id, req.body.name);

    // Send standardized response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Category updated successfully",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};
export const CategoryController = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
    };