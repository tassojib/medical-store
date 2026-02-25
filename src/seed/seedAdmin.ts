import config from "../config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { Role } from "../../generated/prisma/enums";

// Seed initial admin user
const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash(config.admin.password, 8);

  try {
    // Check if admin already exists
    const isEmailExist = await prisma.user.findUnique({
      where: { email: config.admin.email },
    });

    if (isEmailExist) {
      console.log("Admin already exists!!");
      return;
    }

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: config.admin.name,
        email: config.admin.email,
        password: hashedPassword,
        role: Role.ADMIN,
      },
    });

    console.log("Admin created successfully!!");
  } catch (error) {
    console.log(error);
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};

// Run seed
seedAdmin();