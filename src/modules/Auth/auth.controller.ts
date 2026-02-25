import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


// Handle user registration
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.createUser(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Handle user login
const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await AuthService.loginUser(req.body);

    // Store JWT in httpOnly cookie
    res.cookie("token", result.token, {
      secure: false,
      httpOnly: true,
      sameSite: "strict",
    });

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User logged in successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      throw new Error("Unauthorized!");
    }

    // Fetch user profile
    const result = await AuthService.getUserProfile(req.user);

    // Send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile fetched successfully",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};

const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      throw new Error("Unauthorized!");
    }

    // Block empty update request
    if (!Object.keys(req.body).length) {
      throw new Error("Nothing to update");
    }

    // Update user profile
    const result = await AuthService.updateUserProfile(req.user, req.body);

    // Send response
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User profile updated successfully",
      data: result,
    });
  } catch (error) {
    // Forward error to global handler
    next(error);
  }
};


export const AuthController = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};