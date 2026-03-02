/*
  Warnings:

  - A unique constraint covering the columns `[name,sellerId]` on the table `medicines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medicines_name_sellerId_key" ON "medicines"("name", "sellerId");
ALTER TABLE "medicines"
ADD CONSTRAINT "price_non_negative" CHECK ("price" >= 0),
ADD CONSTRAINT "stock_non_negative" CHECK ("stock" >= 0);