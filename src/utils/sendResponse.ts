import { Response } from "express";

// Standardized response type
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
};

// Send standardized JSON response
const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  const { statusCode, success, message, data: DataResponse } = data;

  res.status(statusCode).json({
    success,
    message,
    data: DataResponse,
  });
};

export default sendResponse;