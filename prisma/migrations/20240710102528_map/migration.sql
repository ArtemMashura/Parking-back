/*
  Warnings:

  - A unique constraint covering the columns `[zoneId,lat,lng]` on the table `MapPoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MapPoint_zoneId_lat_lng_key" ON "MapPoint"("zoneId", "lat", "lng");
