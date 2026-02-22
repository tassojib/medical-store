import { Request, Response, NextFunction } from "express";
import sendResponse from "../utils/sendResponse";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("🔥 Global Error:", err.message);

  sendResponse(res, {
    statusCode: err.statusCode || 500,  
    success: err.success ?? false,      
    message: err.message || "Something went wrong", 
  });
};

export default globalErrorHandler;