/*
  Warnings:

  - Added the required column `parkedCarId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "parkedCarId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_parkedCarId_fkey" FOREIGN KEY ("parkedCarId") REFERENCES "Cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
