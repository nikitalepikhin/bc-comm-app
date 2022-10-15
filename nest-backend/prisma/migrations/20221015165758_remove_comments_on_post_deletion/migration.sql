-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postUuid_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "resVote" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "resVote" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
