/*
  Warnings:

  - A unique constraint covering the columns `[coordX,coordY]` on the table `ParkingPlace` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ParkingPlace_coordX_coordY_key" ON "ParkingPlace"("coordX", "coordY");
