/*
  Warnings:

  - Added the required column `finalPrice` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "finalPrice" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT,
    "lastName" TEXT,
    "passwordHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cars" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "sign" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
