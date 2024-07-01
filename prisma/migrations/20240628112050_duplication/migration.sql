/*
  Warnings:

  - You are about to drop the column `ParkingSpotId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `ParkingPlaceId` on the `ParkingSpot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number,floor,parkingPlaceId]` on the table `ParkingSpot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `parkingSpotId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parkingPlaceId` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_ParkingSpotId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_ParkingPlaceId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "ParkingSpotId",
ADD COLUMN     "parkingSpotId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ParkingSpot" DROP COLUMN "ParkingPlaceId",
ADD COLUMN     "parkingPlaceId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ParkingSpot_number_floor_parkingPlaceId_key" ON "ParkingSpot"("number", "floor", "parkingPlaceId");

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_parkingPlaceId_fkey" FOREIGN KEY ("parkingPlaceId") REFERENCES "ParkingPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_parkingSpotId_fkey" FOREIGN KEY ("parkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
