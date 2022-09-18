/*
  Warnings:

  - You are about to drop the `UserDownvotedPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserUpvotedPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDownvotedPost" DROP CONSTRAINT "UserDownvotedPost_postUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserDownvotedPost" DROP CONSTRAINT "UserDownvotedPost_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserUpvotedPost" DROP CONSTRAINT "UserUpvotedPost_postUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserUpvotedPost" DROP CONSTRAINT "UserUpvotedPost_userUuid_fkey";

-- DropTable
DROP TABLE "UserDownvotedPost";

-- DropTable
DROP TABLE "UserUpvotedPost";

-- CreateTable
CREATE TABLE "UserPostVotes" (
    "userUuid" UUID NOT NULL,
    "postUuid" UUID NOT NULL,
    "dir" BOOLEAN NOT NULL,

    CONSTRAINT "UserPostVotes_pkey" PRIMARY KEY ("userUuid","postUuid")
);

-- AddForeignKey
ALTER TABLE "UserPostVotes" ADD CONSTRAINT "UserPostVotes_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPostVotes" ADD CONSTRAINT "UserPostVotes_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
