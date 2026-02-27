import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { SellerService } from "./seller.service";

const createMedicine = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      throw new Error("Medicine data is required");
    }

    // Call service to create medicine
    const result = await SellerService.createMedicine(req.body);

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
export const SellerController = {
   createMedicine
    };