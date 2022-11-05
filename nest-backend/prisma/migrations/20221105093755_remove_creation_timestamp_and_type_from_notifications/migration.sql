/*
  Warnings:

  - You are about to drop the column `created` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "created",
DROP COLUMN "type";

-- DropEnum
DROP TYPE "NotificationType";
