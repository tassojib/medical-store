-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'SELLER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'BANNED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
