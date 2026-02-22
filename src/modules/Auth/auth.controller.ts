import { NextFunction, Request, Response } from "express";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/sendResponse";


const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    try{
         const result=await AuthService.createUser(req.body)
            sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "User created",
      data: result,
    });
    }catch(error){
      next(error)
    }

}

export const AuthController = {
    createUser
    };