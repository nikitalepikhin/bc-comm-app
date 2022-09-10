/*
  Warnings:

  - A unique constraint covering the columns `[textid]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `textid` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "textid" VARCHAR(20) NOT NULL,
ALTER COLUMN "description" SET DATA TYPE VARCHAR(4000);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_textid_key" ON "Channel"("textid");
