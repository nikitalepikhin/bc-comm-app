-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_parentUuid_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
