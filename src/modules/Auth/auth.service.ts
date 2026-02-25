import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";
import { User } from "../../../generated/prisma/client";
import config from "../../config";

type UpdateUserData = {
  name?: string;
  email?: string;
  password?: string;
};

// Create new user
const createUser = async (payload: User) => {
  const hashedPassword = await bcrypt.hash(payload.password, 8);

  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
  });

  // Remove password before returning
  const { password, ...newResult } = result;
  return newResult;
};

// User login
const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  // Validate password
  const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatched) {
    throw new Error("Invalid credentials!!");
  }

  // Pick safe user data for JWT
  const userData = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status,
    email: user.email,
  };

  // Sign JWT token
  const token = jwt.sign(userData, config.jwt_secret, { expiresIn: "1d" });

  // Return token and sanitized user
  const { password, ...newUser } = user;
  return { token, newUser };
};



const getUserProfile = async (payload: JwtPayload) => {
  // Fetch user using token email
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  // Block inactive users
  if (userData.status !== "ACTIVE") {
    throw new Error("Unauthorized!!");
  }

  // Remove password before return
  const { password, ...userWithoutPassword } = userData;
  return userWithoutPassword;
};

const updateUserProfile = async (
  payload: JwtPayload,
  updateText: UpdateUserData
) => {
  // Fetch user using token email
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  // Block inactive users
  if (userData.status !== "ACTIVE") {
    throw new Error("Unauthorized!!");
  }

  // Prepare allowed update fields
  const updateData: UpdateUserData = {};

  if (updateText.email) {
    updateData.email = updateText.email;
  }

  if (updateText.name) {
    updateData.name = updateText.name;
  }

  if (updateText.password) {
    // Hash new password
    const hashedPassword = await bcrypt.hash(updateText.password, 8);
    updateData.password = hashedPassword;
  }

  // Update user record
  const updatedUser = await prisma.user.update({
    where: { email: userData.email },
    data: updateData,
  });

  // Remove password before return
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

export const AuthService = {
  createUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};