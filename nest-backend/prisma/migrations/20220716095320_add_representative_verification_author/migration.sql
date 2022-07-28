/*
  Warnings:

  - Added the required column `verifiedByUserUuid` to the `Representative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Representative" ADD COLUMN     "verifiedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verifiedByUserUuid" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_verifiedByUserUuid_fkey" FOREIGN KEY ("verifiedByUserUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
