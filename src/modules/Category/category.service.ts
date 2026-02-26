
import { Category } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createCategory = async ({ name }: { name: string }) => {
  // Validate input
  if (!name) {
    throw new Error("Category name is required");
  }

  const trimmedName = name.trim();

  // Create category in database
  const result = await prisma.category.create({
    data: { name: trimmedName },
  });

  // Remove timestamps before returning
  const { createdAt, updatedAt, ...category } = result;

  // Return clean category object
  return category;
};

const getCategory = async () => {
  // Fetch all categories, ordered by name
  const result = await prisma.category.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
    },
  });

  // Return list of categories
  return result;
};

const deleteCategory = async (id: string) => {
  // Check if category exists
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Category not found");
  }

  // Delete category from DB
  const result = await prisma.category.delete({
    where: { id },
  });

  // Return deleted category info
  return result;
};

const updateCategory = async (id: string, updateText: string) => {
  // Check if category exists
  const existing = await prisma.category.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Category not found");
  }

  // Trim new category name
  const trimmedText = updateText.trim();

  // Update category in DB
  const result = await prisma.category.update({
    where: { id },
    data: { name: trimmedText },
  });

  // Return updated category
  return result;
};

export const CategoryService = {
    createCategory,
    getCategory,
    deleteCategory,
    updateCategory
    };