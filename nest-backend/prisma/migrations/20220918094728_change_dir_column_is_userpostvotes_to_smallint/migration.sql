/*
  Warnings:

  - Changed the type of `dir` on the `UserPostVotes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "UserPostVotes" DROP COLUMN "dir",
ADD COLUMN     "dir" SMALLINT NOT NULL;
