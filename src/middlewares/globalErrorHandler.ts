import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

// Central error handler for the app
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error for debugging
  console.log("🔥 Global Error:", err.message);

  // Send standardized error response
  sendResponse(res, {
    statusCode: err.statusCode || 500,
    success: err.success ?? false,
    message: err.message || "Something went wrong",
  });
};

export default globalErrorHandler;