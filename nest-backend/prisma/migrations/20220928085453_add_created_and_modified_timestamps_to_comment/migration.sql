-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "resVote" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "resVote" SET DEFAULT 0;
