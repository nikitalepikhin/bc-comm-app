-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('POST', 'COMMENT');

-- CreateTable
CREATE TABLE "Notification" (
    "uuid" UUID NOT NULL,
    "userUuid" UUID NOT NULL,
    "commentUuid" UUID NOT NULL,
    "type" "NotificationType" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentUuid_fkey" FOREIGN KEY ("commentUuid") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
