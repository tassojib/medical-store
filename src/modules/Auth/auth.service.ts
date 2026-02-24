import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";
import config from "../../config";

const createUser=async(payload:User)=>{
const hashedPassword= await bcrypt.hash(payload.password,8)
const result=await prisma.user.create({
    data:{...payload,password:hashedPassword}
})
const {password,...newResult}=result
return newResult
}

const loginUser = async (payload: {email:string,password:string}) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });
  if (!user) {
    throw new Error("User not found!");
  }

  const ispasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!ispasswordMatched) {
    throw new Error("Invalid credentials!!");
  }

  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status,
    email: user.email,
  };

  const token = jwt.sign(userData, config.jwt_secret, { expiresIn: "1d" });
const {password,...newUser}=user
  return {
    token,
    newUser,
  };
};


export const AuthService = {
    
    createUser,loginUser
    };