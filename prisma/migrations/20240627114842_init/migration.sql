-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "coordX" DOUBLE PRECISION NOT NULL,
    "coordY" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParkingSpot" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "floor" INTEGER NOT NULL,
    "ParkingLotId" INTEGER NOT NULL,

    CONSTRAINT "ParkingSpot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "takenFrom" TIMESTAMP(3) NOT NULL,
    "takenUntil" TIMESTAMP(3) NOT NULL,
    "ParkingSpotId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParkingSpot" ADD CONSTRAINT "ParkingSpot_ParkingLotId_fkey" FOREIGN KEY ("ParkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_ParkingSpotId_fkey" FOREIGN KEY ("ParkingSpotId") REFERENCES "ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
