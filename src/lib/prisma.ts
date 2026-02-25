import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

// Database connection string from env
const connectionString = process.env.DATABASE_URL;

// PostgreSQL adapter for Prisma
const adapter = new PrismaPg({ connectionString });

// Prisma client using PG adapter
const prisma = new PrismaClient({ adapter });

export { prisma };
