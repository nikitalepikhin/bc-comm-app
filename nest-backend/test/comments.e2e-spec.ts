import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import TestUtils from "./test-utils";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import CreatePostRequestDto from "../src/posts/dto/create-post-request.dto";
import CreateCommentRequestDto from "../src/comments/dto/create-comment-request.dto";
import GetPostCommentsQueryDto from "../src/comments/dto/get-post-comments-query.dto";
import { CommentsOrder } from "../src/comments/dto/comments-order.enum";
import UpdateCommentRequestDto from "../src/comments/dto/update-comment-request.dto";
import VoteOnCommentRequestDto from "../src/comments/dto/vote-on-comment-request.dto";
import DeleteCommentRequestDto from "../src/comments/dto/delete-comment-request.dto";

describe("Posts Module Tests", () => {
  let app: INestApplication;
  let accessToken = "";
  let postUuid = "";
  let commentUuid = "";
  let replyUuid = "";

  beforeAll(async () => {
    app = await TestUtils.initApp();
    await app.init();

    const loginPayload: LogInUserRequestDto = { email: "student@email.com", password: "pass123" };
    const loginResponse = await request(app.getHttpServer()).post("/auth/login").send(loginPayload).expect(201);
    accessToken = loginResponse.body.accessToken;

    const payload: CreatePostRequestDto = {
      channelUuid: "ff5958fb-d1be-426b-ab5b-a3302ec803f0",
      title: "test test",
      body: "test post body",
    };
    const { body } = await request(app.getHttpServer())
      .post("/posts")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
    postUuid = body.uuid;
  });

  it("should create a comment", async () => {
    const payload: CreateCommentRequestDto = {
      postUuid,
      body: "this is a comment",
    };
    const response = await request(app.getHttpServer())
      .post("/comments")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
    expect(response.body.uuid).toBeDefined();
    commentUuid = response.body.uuid;
  });

  it("should get post comments", async () => {
    const payload: GetPostCommentsQueryDto = {
      after: new Date(),
      order: CommentsOrder.new,
      page: 1,
    };
    const response = await request(app.getHttpServer())
      .get(`/comments/post/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200);

    expect(response.body.hasMore).toEqual(false);
    expect(response.body.comments).toHaveLength(1);
    const comment = response.body.comments[0];
    expect(comment.uuid).toEqual(commentUuid);
    expect(comment.body).toEqual("this is a comment");
    expect(comment.author).toEqual("student0");
    expect(comment.isAuthor).toEqual(true);
    expect(comment.authorIsTeacher).toEqual(false);
    expect(comment.created).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(comment.modified).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(comment.edited).toEqual(false);
    expect(comment.up).toEqual(0);
    expect(comment.down).toEqual(0);
    expect(comment.dir).toEqual(0);
    expect(comment.hasMore).toEqual(false);
    expect(comment.level).toEqual(1);
    expect(comment.parentUuid).toBeNull();
    expect(comment.rootUuid).toEqual(commentUuid);
    expect(comment.postUuid).toEqual(postUuid);
    expect(comment.comments).toHaveLength(0);
  });

  it("should reply to a comment", async () => {
    const payload: CreateCommentRequestDto = {
      postUuid,
      parentUuid: commentUuid,
      body: "this is a reply",
    };
    const response = await request(app.getHttpServer())
      .post("/comments")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);

    expect(response.body.uuid).toBeDefined();
    replyUuid = response.body.uuid;
  });

  it("should get comment replies", async () => {
    const response = await request(app.getHttpServer())
      .get(`/comments/comment/${commentUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200);

    expect(response.body.comments).toBeDefined();
    expect(response.body.comments).toHaveLength(1);

    const comment = response.body.comments[0];
    expect(comment.uuid).toEqual(commentUuid);
    expect(comment.body).toEqual("this is a comment");
    expect(comment.author).toEqual("student0");
    expect(comment.isAuthor).toEqual(true);
    expect(comment.authorIsTeacher).toEqual(false);
    expect(comment.created).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(comment.modified).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(comment.edited).toEqual(false);
    expect(comment.up).toEqual(0);
    expect(comment.down).toEqual(0);
    expect(comment.dir).toEqual(0);
    expect(comment.hasMore).toEqual(false);
    expect(comment.level).toEqual(1);
    expect(comment.parentUuid).toBeNull();
    expect(comment.rootUuid).toEqual(commentUuid);
    expect(comment.postUuid).toEqual(postUuid);
    expect(comment.comments).toHaveLength(1);

    const reply = comment.comments[0];
    expect(reply.uuid).toEqual(replyUuid);
    expect(reply.body).toEqual("this is a reply");
    expect(reply.author).toEqual("student0");
    expect(reply.isAuthor).toEqual(true);
    expect(reply.authorIsTeacher).toEqual(false);
    expect(reply.created).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(reply.modified).toMatch(new RegExp(`${new Date().toISOString().substring(0, 10)}`));
    expect(reply.edited).toEqual(false);
    expect(reply.up).toEqual(0);
    expect(reply.down).toEqual(0);
    expect(reply.dir).toEqual(0);
    expect(reply.hasMore).toEqual(false);
    expect(reply.level).toEqual(2);
    expect(reply.parentUuid).toEqual(commentUuid);
    expect(reply.rootUuid).toEqual(commentUuid);
    expect(reply.postUuid).toEqual(postUuid);
    expect(reply.comments).toHaveLength(0);
  });

  it("should update a comment", async () => {
    const payload: UpdateCommentRequestDto = {
      uuid: commentUuid,
      postUuid,
      body: "this is an updated comment",
    };
    await request(app.getHttpServer())
      .put("/comments")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should get the updated comment", async () => {
    const payload: GetPostCommentsQueryDto = {
      after: new Date(),
      order: CommentsOrder.new,
      page: 1,
    };
    const response = await request(app.getHttpServer())
      .get(`/comments/post/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200);

    expect(response.body.comments).toHaveLength(1);
    expect(response.body.comments[0].body).toEqual("this is an updated comment");
    expect(response.body.comments[0].edited).toEqual(true);
  });

  it("should vote on a comment", async () => {
    const payload: VoteOnCommentRequestDto = {
      uuid: commentUuid,
      dir: 1,
    };
    const response = await request(app.getHttpServer())
      .post("/comments/vote")
      .send(payload)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(201);
  });

  it("should check the vote on the comment", async () => {
    const payload: GetPostCommentsQueryDto = {
      after: new Date(),
      order: CommentsOrder.new,
      page: 1,
    };
    const response = await request(app.getHttpServer())
      .get(`/comments/post/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200);

    expect(response.body.comments).toHaveLength(1);
    const comment = response.body.comments[0];
    expect(comment.up).toEqual(1);
    expect(comment.down).toEqual(0);
    expect(comment.dir).toEqual(1);
  });

  it("should delete the root comment with all its children", async () => {
    const payload: DeleteCommentRequestDto = {
      uuid: commentUuid,
      postUuid,
    };
    await request(app.getHttpServer())
      .delete("/comments")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should not find any comments after deletion", async () => {
    const payload: GetPostCommentsQueryDto = {
      after: new Date(),
      order: CommentsOrder.new,
      page: 1,
    };
    const response = await request(app.getHttpServer())
      .get(`/comments/post/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200);

    expect(response.body.comments).toBeDefined();
    expect(response.body.comments).toHaveLength(0);
    expect(response.body.hasMore).toEqual(false);
  });
});
