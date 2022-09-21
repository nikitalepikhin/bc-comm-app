/*
  Warnings:

  - Added the required column `authorUsername` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorUsername" VARCHAR(32) NOT NULL;
