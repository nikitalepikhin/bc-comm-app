/*
  Warnings:

  - You are about to drop the `ChannelAdminUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelAdminUsers" DROP CONSTRAINT "ChannelAdminUsers_channelUuid_fkey";

-- DropForeignKey
ALTER TABLE "ChannelAdminUsers" DROP CONSTRAINT "ChannelAdminUsers_userUuid_fkey";

-- DropTable
DROP TABLE "ChannelAdminUsers";
