import { NextFunction, Request, Response } from "express";
import { Role } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

// Role-based authentication middleware
const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Read token from Authorization header
      const token = req.headers.authorization;

      // Block request if token is missing
      if (!token) {
        throw new Error("Token not found!!");
      }

      // Verify and decode JWT
      const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;

      // Check user existence in database
      const userData = await prisma.user.findUnique({
        where: {
          email: decoded.email,
        },
      });

      // Block if user does not exist
      if (!userData) {
        throw new Error("Unauthorized!");
      }

      // Block if user is not active
      if (userData.status !== "ACTIVE") {
        throw new Error("Unauthorized!!");
      }

      // Role-based access check
      if (roles.length && !roles.includes(decoded.role)) {
        throw new Error("Unauthorized!!!");
      }

      // Attach decoded user to request
      req.user = decoded;

      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default auth;