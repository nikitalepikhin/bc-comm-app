/*
  Warnings:

  - Added the required column `postalCode` to the `Faculty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `School` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "postalCode" VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE "School" ADD COLUMN     "postalCode" VARCHAR(10) NOT NULL;
