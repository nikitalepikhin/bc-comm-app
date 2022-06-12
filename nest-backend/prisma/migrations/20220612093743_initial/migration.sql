-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'REPRESENTATIVE', 'TEACHER', 'STUDENT');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'DELETED');

-- CreateTable
CREATE TABLE "RefreshToken" (
    "uuid" UUID NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "tokenFamily" UUID NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Authority" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "roles" "Role"[],

    CONSTRAINT "Authority_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL,
    "status" "Status" NOT NULL,
    "role" "Role" NOT NULL,
    "username" VARCHAR(32) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(1024) NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usernameModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "passwordModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "userUuid" UUID NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "nameModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" VARCHAR(1024),
    "bioModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "schoolUuid" UUID NOT NULL,
    "schoolModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "facultyUuid" UUID NOT NULL,
    "facultyModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("userUuid")
);

-- CreateTable
CREATE TABLE "Representative" (
    "userUuid" UUID NOT NULL,
    "schoolUuid" UUID NOT NULL,
    "schoolModified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("userUuid")
);

-- CreateTable
CREATE TABLE "School" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "countryCode" VARCHAR(3) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "addressLineOne" VARCHAR(256) NOT NULL,
    "addressLineTwo" VARCHAR(256) NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUuid" UUID NOT NULL,
    "modifiedByUuid" UUID NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "uuid" UUID NOT NULL,
    "schoolUuid" UUID NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "countryCode" VARCHAR(3) NOT NULL,
    "city" VARCHAR(128) NOT NULL,
    "addressLineOne" VARCHAR(256) NOT NULL,
    "addressLineTwo" VARCHAR(256) NOT NULL,
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUuid" UUID NOT NULL,
    "modifiedByUuid" UUID NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Channel" (
    "uuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(512),
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdByUuid" UUID NOT NULL,
    "modifiedByUuid" UUID NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "ChannelSubscribedUsers" (
    "userUuid" UUID NOT NULL,
    "channelUuid" UUID NOT NULL,
    "subscribedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelSubscribedUsers_pkey" PRIMARY KEY ("userUuid","channelUuid")
);

-- CreateTable
CREATE TABLE "ChannelAdminUsers" (
    "userUuid" UUID NOT NULL,
    "channelUuid" UUID NOT NULL,
    "subscribedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelAdminUsers_pkey" PRIMARY KEY ("userUuid","channelUuid")
);

-- CreateTable
CREATE TABLE "Post" (
    "uuid" UUID NOT NULL,
    "channelUuid" UUID NOT NULL,
    "authorUuid" UUID NOT NULL,
    "title" VARCHAR(300) NOT NULL,
    "body" VARCHAR(40000),
    "created" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserUpvotedPost" (
    "userUuid" UUID NOT NULL,
    "postUuid" UUID NOT NULL,

    CONSTRAINT "UserUpvotedPost_pkey" PRIMARY KEY ("userUuid","postUuid")
);

-- CreateTable
CREATE TABLE "UserDownvotedPost" (
    "userUuid" UUID NOT NULL,
    "postUuid" UUID NOT NULL,

    CONSTRAINT "UserDownvotedPost_pkey" PRIMARY KEY ("userUuid","postUuid")
);

-- CreateTable
CREATE TABLE "Comment" (
    "uuid" UUID NOT NULL,
    "postUuid" UUID NOT NULL,
    "authorUuid" UUID NOT NULL,
    "body" VARCHAR(10000) NOT NULL,
    "parentUuid" UUID,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "UserUpvotedComment" (
    "userUuid" UUID NOT NULL,
    "commentUuid" UUID NOT NULL,

    CONSTRAINT "UserUpvotedComment_pkey" PRIMARY KEY ("userUuid","commentUuid")
);

-- CreateTable
CREATE TABLE "UserDownvotedComment" (
    "userUuid" UUID NOT NULL,
    "commentUuid" UUID NOT NULL,

    CONSTRAINT "UserDownvotedComment_pkey" PRIMARY KEY ("userUuid","commentUuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_refreshToken_key" ON "RefreshToken"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authority_name_key" ON "Authority"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_userUuid_key" ON "Teacher"("userUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Representative_userUuid_key" ON "Representative"("userUuid");

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_schoolUuid_fkey" FOREIGN KEY ("schoolUuid") REFERENCES "School"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_facultyUuid_fkey" FOREIGN KEY ("facultyUuid") REFERENCES "Faculty"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Representative" ADD CONSTRAINT "Representative_schoolUuid_fkey" FOREIGN KEY ("schoolUuid") REFERENCES "School"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_modifiedByUuid_fkey" FOREIGN KEY ("modifiedByUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_modifiedByUuid_fkey" FOREIGN KEY ("modifiedByUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_schoolUuid_fkey" FOREIGN KEY ("schoolUuid") REFERENCES "School"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_createdByUuid_fkey" FOREIGN KEY ("createdByUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_modifiedByUuid_fkey" FOREIGN KEY ("modifiedByUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelSubscribedUsers" ADD CONSTRAINT "ChannelSubscribedUsers_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelSubscribedUsers" ADD CONSTRAINT "ChannelSubscribedUsers_channelUuid_fkey" FOREIGN KEY ("channelUuid") REFERENCES "Channel"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelAdminUsers" ADD CONSTRAINT "ChannelAdminUsers_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelAdminUsers" ADD CONSTRAINT "ChannelAdminUsers_channelUuid_fkey" FOREIGN KEY ("channelUuid") REFERENCES "Channel"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_channelUuid_fkey" FOREIGN KEY ("channelUuid") REFERENCES "Channel"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpvotedPost" ADD CONSTRAINT "UserUpvotedPost_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpvotedPost" ADD CONSTRAINT "UserUpvotedPost_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDownvotedPost" ADD CONSTRAINT "UserDownvotedPost_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDownvotedPost" ADD CONSTRAINT "UserDownvotedPost_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "Post"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorUuid_fkey" FOREIGN KEY ("authorUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postUuid_fkey" FOREIGN KEY ("postUuid") REFERENCES "Post"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentUuid_fkey" FOREIGN KEY ("parentUuid") REFERENCES "Comment"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpvotedComment" ADD CONSTRAINT "UserUpvotedComment_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserUpvotedComment" ADD CONSTRAINT "UserUpvotedComment_commentUuid_fkey" FOREIGN KEY ("commentUuid") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDownvotedComment" ADD CONSTRAINT "UserDownvotedComment_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDownvotedComment" ADD CONSTRAINT "UserDownvotedComment_commentUuid_fkey" FOREIGN KEY ("commentUuid") REFERENCES "Comment"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
