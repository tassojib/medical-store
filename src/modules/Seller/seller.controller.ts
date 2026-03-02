import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { SellerService } from "./seller.service";

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      if (!req.user ) {
      throw new Error("Unauthorized!");
    }
 
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Medicine data is required");
    }

    // Call service to create medicine
    const result = await SellerService.createMedicine(req.body,req.user.id);

    // Send standardized response
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Medicine created",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};

const updateMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
      if (!req.user ) {
      throw new Error("Unauthorized!");
    }
    const medicineId = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    // Validate ID
    if (!medicineId || !medicineId.trim()) {
      throw new Error("Medicine id is required");
    }
 
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Medicine data is required");
    }

    // Call service to update medicine
    const result = await SellerService.updateMedicine(req.body,req.user.id,medicineId);

    // Send standardized response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Medicine updated",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};


export const SellerController = {
   createMedicine,
   updateMedicine
    };