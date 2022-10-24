-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorUuid_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorUuid_fkey";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "resVote" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "resVote" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
