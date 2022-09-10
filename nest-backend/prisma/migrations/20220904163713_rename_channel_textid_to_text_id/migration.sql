/*
  Warnings:

  - You are about to drop the column `textid` on the `Channel` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[textId]` on the table `Channel` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `textId` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Channel_textid_key";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "textid",
ADD COLUMN     "textId" VARCHAR(20) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Channel_textId_key" ON "Channel"("textId");
