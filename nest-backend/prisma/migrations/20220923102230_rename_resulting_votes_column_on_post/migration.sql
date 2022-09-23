/*
  Warnings:

  - You are about to drop the column `up` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "up",
ADD COLUMN     "resVote" BIGINT NOT NULL DEFAULT 0;
