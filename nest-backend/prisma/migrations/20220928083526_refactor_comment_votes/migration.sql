/*
  Warnings:

  - You are about to drop the `UserDownvotedComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserUpvotedComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDownvotedComment" DROP CONSTRAINT "UserDownvotedComment_commentUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserDownvotedComment" DROP CONSTRAINT "UserDownvotedComment_userUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserUpvotedComment" DROP CONSTRAINT "UserUpvotedComment_commentUuid_fkey";

-- DropForeignKey
ALTER TABLE "UserUpvotedComment" DROP CONSTRAINT "UserUpvotedComment_userUuid_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "resVote" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "resVote" SET DEFAULT 0;

-- DropTable
DROP TABLE "UserDownvotedComment";

-- DropTable
DROP TABLE "UserUpvotedComment";

-- CreateTable
CREATE TABLE "UserCommentVotes" (
    "userUuid" UUID NOT NULL,
    "commentUuid" UUID NOT NULL,
    "dir" SMALLINT NOT NULL,

    CONSTRAINT "UserCommentVotes_pkey" PRIMARY KEY ("userUuid","commentUuid")
);

-- AddForeignKey
ALTER TABLE "UserCommentVotes" ADD CONSTRAINT "UserCommentVotes_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCommentVotes" ADD CONSTRAINT "UserCommentVotes_commentUuid_fkey" FOREIGN KEY ("commentUuid") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
