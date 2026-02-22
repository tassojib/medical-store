
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";
const createUser=async(payload:User)=>{
const hashedPassword= await bcrypt.hash(payload.password,8)
const result=await prisma.user.create({
    data:{...payload,password:hashedPassword}
})
const {password,...newResult}=result
return newResult
}

export const AuthService = {
    
    createUser
    };