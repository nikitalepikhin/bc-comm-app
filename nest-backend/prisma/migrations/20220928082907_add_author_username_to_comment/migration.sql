/*
  Warnings:

  - Added the required column `authorUsername` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "authorUsername" VARCHAR(32) NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "resVote" SET DEFAULT 0;
