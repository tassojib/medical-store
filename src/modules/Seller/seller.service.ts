import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const createMedicine = async (createText: Medicine) => {
  // Validate required fields
  if (
    !createText.name ||
    !createText.manufacturer ||
    !createText.price ||
    !createText.categoryId ||
    !createText.sellerId
  ) {
    throw new Error("Missing required fields");
  }

  // Trim text fields
  const trimmedName = createText.name.trim();
  const trimmedManufacturer = createText.manufacturer.trim();
  const trimmedDesc = createText.desc?.trim();     // optional
  const trimmedImgUrl = createText.imgUrl?.trim(); // optional

  // Check for existing medicine by the same seller
  const existing = await prisma.medicine.findFirst({
    where: {
      name: trimmedName,
      sellerId: createText.sellerId,
    },
  });

  if (existing) {
    throw new Error("Medicine already exists for this seller");
  }

  // Create medicine in DB
  const result = await prisma.medicine.create({
    data: {
      name: trimmedName,
      manufacturer: trimmedManufacturer,
      desc: trimmedDesc,
      imgUrl: trimmedImgUrl,
      price: createText.price, 
      stock: createText.stock,
      categoryId: createText.categoryId,
      sellerId: createText.sellerId,
    },
  });

  // Return newly created medicine
  return result;
};

export const SellerService = {
    createMedicine
    };