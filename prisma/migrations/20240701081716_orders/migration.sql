/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `durationInHours` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "durationInHours" INTEGER NOT NULL,
ADD COLUMN     "pricePerHour" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
