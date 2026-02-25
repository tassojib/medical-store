import dotenv from "dotenv";
import path from "path";

// Load .env from project root
dotenv.config({ path: path.join(process.cwd(), ".env") });

// Fail fast if JWT secret is missing
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

// Fail fast if admin seed credentials are missing
if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
  throw new Error("Admin credentials are missing in environment variables");
}

export default {
  // Server port
  port: process.env.PORT || 3000,

  // Database connection string
  database_url: process.env.DATABASE_URL as string,

  // JWT signing secret
  jwt_secret: process.env.JWT_SECRET,

  // Admin seed data
  admin: {
    name: process.env.ADMIN_NAME || "Admin",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD
  },
};
