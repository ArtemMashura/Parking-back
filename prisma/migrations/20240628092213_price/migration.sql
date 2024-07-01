/*
  Warnings:

  - You are about to drop the column `ParkingLotId` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the `ParkingLot` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ParkingPlaceId` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pricePerHour` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_ParkingLotId_fkey";

-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "ParkingSpot" DROP COLUMN "ParkingLotId",
ADD COLUMN     "ParkingPlaceId" TEXT NOT NULL,
ADD COLUMN     "pricePerHour" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- DropTable
DROP TABLE "ParkingLot";

-- CreateTable
CREATE TABLE "ParkingPlace" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "coordX" DOUBLE PRECISION NOT NULL,
    "coordY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ParkingPlace_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_ParkingPlaceId_fkey" FOREIGN KEY ("ParkingPlaceId") REFERENCES "ParkingPlace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
