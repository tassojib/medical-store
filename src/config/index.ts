import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing in environment variables");
}

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_secret:process.env.JWT_SECRET
};
