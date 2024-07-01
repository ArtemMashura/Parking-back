-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_parkingSpotId_fkey";

-- DropForeignKey
ALTER TABLE "ParkingSpot" DROP CONSTRAINT "ParkingSpot_parkingPlaceId_fkey";

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_parkingPlaceId_fkey" FOREIGN KEY ("parkingPlaceId") REFERENCES "ParkingPlace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_parkingSpotId_fkey" FOREIGN KEY ("parkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
