-- CreateTable
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "color" TEXT NOT NULL,

    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MapPoint" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "lat" DECIMAL(8,5) NOT NULL,
    "lng" DECIMAL(8,5) NOT NULL,
    "zoneId" TEXT NOT NULL,

    CONSTRAINT "MapPoint_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MapPoint" ADD CONSTRAINT "MapPoint_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
