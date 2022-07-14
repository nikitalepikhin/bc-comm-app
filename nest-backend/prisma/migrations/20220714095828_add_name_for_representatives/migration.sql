/*
  Warnings:

  - Added the required column `name` to the `Representative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Representative" ADD COLUMN     "name" VARCHAR(128) NOT NULL,
ADD COLUMN     "nameModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
