-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "requestsVerification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "verifiedAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verifiedByUserUuid" UUID;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_verifiedByUserUuid_fkey" FOREIGN KEY ("verifiedByUserUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
