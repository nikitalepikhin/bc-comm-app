import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RefreshTokensModule } from "./refresh-tokens/refresh-tokens.module";
import { CookieModule } from "./cookie/cookie.module";
import { TestModule } from "./test/test.module";
import { SchoolsModule } from "./schools/schools.module";
import { AuthoritiesModule } from "./authorities/authorities.module";
import { RepresentativesModule } from "./representatives/representatives.module";
import { FacultiesModule } from "./faculties/faculties.module";
import { TeachersModule } from "./teachers/teachers.module";
import { ChannelsModule } from "./channels/channels.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { FeedModule } from "./feed/feed.module";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    RefreshTokensModule,
    CookieModule,
    TestModule,
    SchoolsModule,
    AuthoritiesModule,
    RepresentativesModule,
    FacultiesModule,
    TeachersModule,
    ChannelsModule,
    PostsModule,
    CommentsModule,
    FeedModule,
  ],
})
export class AppModule {}
