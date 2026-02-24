import config from "../config"
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";
const seedAdmin=async()=>{
      const hashedPassword = await bcrypt.hash(config.admin.password, 8);
      try{
 const isEmailExist=await prisma.user.findUnique({
    where:{
        email:config.admin.email
    }
 })
if(isEmailExist){
      console.log("Admin already exists!!");
      return;
}
    const admin = await prisma.user.create({
        data: {
  name: config.admin.name,
  email: config.admin.email,
  password: hashedPassword,
  role: Role.ADMIN
},
    }
        
    );
 console.log("Admin created successfully!!");
      }catch(error){
        console.log(error)
      }finally{
       await prisma.$disconnect()
      }
}
seedAdmin()