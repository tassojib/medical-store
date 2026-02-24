import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });


if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error("Admin credentials are missing in environment variables");
}

export default {
 
  port: process.env.PORT || 3000,

 
  database_url: process.env.DATABASE_URL as string,


  jwt_secret: process.env.JWT_SECRET,

  // admin seed data
  admin: {
    name: process.env.ADMIN_NAME || "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
   
  },
};
