/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the column `parkedCarId` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `Cars` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `parkedCarSign` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cars" DROP CONSTRAINT "Cars_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_parkedCarId_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "ownerId",
DROP COLUMN "parkedCarId",
ADD COLUMN     "parkedCarSign" TEXT NOT NULL;

-- DropTable
DROP TABLE "Cars";

-- DropTable
DROP TABLE "User";
