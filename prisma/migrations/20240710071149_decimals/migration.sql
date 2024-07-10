/*
  Warnings:

  - You are about to alter the column `finalPrice` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,2)`.
  - You are about to alter the column `pricePerHour` on the `Orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.
  - You are about to alter the column `pricePerHour` on the `ParkingSpot` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "finalPrice" SET DATA TYPE DECIMAL(8,2),
ALTER COLUMN "pricePerHour" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "ParkingSpot" ALTER COLUMN "pricePerHour" SET DATA TYPE DECIMAL(5,2);
