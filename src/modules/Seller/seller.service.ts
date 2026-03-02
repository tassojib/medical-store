import { Medicine} from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createMedicine = async (payload: Medicine, id: string) => {
  // Validate required fields
  if (
    !payload.name?.trim() ||
    !payload.manufacturer?.trim() ||
    payload.price === undefined ||
    payload.price === null ||
    Number(payload.price) < 0 ||
    !payload.categoryId
  ) {
    throw new Error(
      "Missing required fields: name, manufacturer, price, categoryId"
    );
  }

  // Ensure category exists
  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
    select: { id: true },
  });

  if (!category) {
    throw new Error("Invalid category");
  }

  // Create medicine in DB
  const result = await prisma.medicine.create({
    data: {
      name: payload.name.trim(),
      manufacturer: payload.manufacturer.trim(),
      desc: payload.desc?.trim(),
      imgUrl: payload.imgUrl?.trim(),
      price: payload.price,
      stock: payload.stock ?? 0, // Default stock to 0
      categoryId: payload.categoryId,
      sellerId: id, // Attach seller from auth context
    },
  });

  // Return created medicine
  return result;
};

const updateMedicine = async (
  payload: Partial<Medicine>,
  sellerId: string,
  medicineId: string
) => {

  // Check ownership
  const medicineData = await prisma.medicine.findUniqueOrThrow({
    where: { id: medicineId },
    select: { sellerId: true }
  });

  if (medicineData.sellerId !== sellerId) {
    throw new Error("Unauthorized!");
  }

  // Prepare update object
  const updateData: Partial<Medicine> = {};

  // Trim string fields
  if (payload.name) updateData.name = payload.name.trim();
  if (payload.manufacturer) updateData.manufacturer = payload.manufacturer.trim();
  if (payload.desc) updateData.desc = payload.desc.trim();
  if (payload.imgUrl) updateData.imgUrl = payload.imgUrl.trim();

  // Update numeric fields
  if (payload.price !== undefined) updateData.price = payload.price;
  if (payload.stock !== undefined) updateData.stock = payload.stock;

  // Validate category if provided
  if (payload.categoryId) {
    const category = await prisma.category.findUnique({
      where: { id: payload.categoryId },
      select: { id: true }
    });

    if (!category) {
      throw new Error("Invalid category");
    }

    updateData.categoryId = payload.categoryId;
  }

  // Update medicine
  const result = await prisma.medicine.update({
    where: { id: medicineId },
    data: updateData,
  });

  // Return updated data
  return result;
};

export const SellerService = {
    createMedicine,
    updateMedicine
    };