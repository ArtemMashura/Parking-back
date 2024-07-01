/*
  Warnings:

  - The primary key for the `Orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParkingLot` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ParkingSpot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_ParkingSpotId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_ParkingLotId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ParkingSpotId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Orders_id_seq";

-- AlterTable
ALTER TABLE "ParkingLot" DROP CONSTRAINT "ParkingLot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParkingLot_id_seq";

-- AlterTable
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ParkingLotId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ParkingSpot_id_seq";

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_ParkingLotId_fkey" FOREIGN KEY ("ParkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_ParkingSpotId_fkey" FOREIGN KEY ("ParkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
