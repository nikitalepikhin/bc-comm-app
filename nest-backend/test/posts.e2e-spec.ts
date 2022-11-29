import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import TestUtils from "./test-utils";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import CreatePostRequestDto from "../src/posts/dto/create-post-request.dto";
import UpdatePostRequestDto from "../src/posts/dto/update-post-request.dto";
import VoteOnPostRequestDto from "../src/posts/dto/vote-on-post-request.dto";
import DeletePostRequestDto from "../src/posts/dto/delete-post-request.dto";

describe("Posts Module Tests", () => {
  let app: INestApplication;
  let accessToken = "";
  let postUuid = "";

  beforeAll(async () => {
    app = await TestUtils.initApp();
    await app.init();

    const payload: LogInUserRequestDto = { email: "student@email.com", password: "pass123" };
    await request(app.getHttpServer())
      .post("/auth/login")
      .send(payload)
      .expect((res) => {
        accessToken = res.body.accessToken;
      });
  });

  it("should create a post in the demo channel", async () => {
    const payload: CreatePostRequestDto = {
      channelUuid: "ff5958fb-d1be-426b-ab5b-a3302ec803f0",
      title: "post title",
      body: "post body",
    };
    const response = await request(app.getHttpServer())
      .post("/posts")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);

    expect(response.body.uuid).toBeDefined();
    expect(response.body.uuid).not.toEqual("");

    postUuid = response.body.uuid;
  });

  it("should get a post by uuid", async () => {
    const response = await request(app.getHttpServer())
      .get(`/posts/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200);

    const now = new RegExp(new Date().toISOString().substring(0, 10));
    expect(response.body.post.uuid).toEqual(postUuid);
    expect(response.body.post.title).toEqual("post title");
    expect(response.body.post.body).toEqual("post body");
    expect(response.body.post.created).toMatch(now);
    expect(response.body.post.modified).toMatch(now);
    expect(response.body.post.author).toEqual("student0");
    expect(response.body.post.isAuthor).toEqual(true);
    expect(response.body.post.authorIsTeacher).toEqual(false);
    expect(response.body.post.edited).toEqual(false);
    expect(response.body.post.up).toEqual(0);
    expect(response.body.post.down).toEqual(0);
    expect(response.body.post.dir).toEqual(0);
    expect(response.body.post.commentsCount).toEqual(0);
  });

  it("should not get a post by uuid", async () => {
    await request(app.getHttpServer())
      .get(`/posts/ff5958fb-d1be-426b-ab5b-a3302ec80303`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(404);
  });

  it("should get posts for the demo channel", async () => {
    const response = await request(app.getHttpServer())
      .get("/posts/channel/demo")
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200);

    const now = new RegExp(new Date().toISOString().substring(0, 10));
    expect(response.body.posts).toHaveLength(1);
    expect(response.body.hasMore).toEqual(false);
    expect(response.body.posts[0].uuid).toEqual(postUuid);
    expect(response.body.posts[0].title).toEqual("post title");
    expect(response.body.posts[0].body).toEqual("post body");
    expect(response.body.posts[0].created).toMatch(now);
    expect(response.body.posts[0].modified).toMatch(now);
    expect(response.body.posts[0].author).toEqual("student0");
    expect(response.body.posts[0].isAuthor).toEqual(true);
    expect(response.body.posts[0].authorIsTeacher).toEqual(false);
    expect(response.body.posts[0].edited).toEqual(false);
    expect(response.body.posts[0].up).toEqual(0);
    expect(response.body.posts[0].down).toEqual(0);
    expect(response.body.posts[0].dir).toEqual(0);
    expect(response.body.posts[0].commentsCount).toEqual(0);
  });

  it("should update a post in the demo channel", async () => {
    const payload: UpdatePostRequestDto = {
      body: "new post body",
      postUuid,
    };
    await request(app.getHttpServer())
      .put("/posts")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should vote on a post and then get the updated post", async () => {
    const payload: VoteOnPostRequestDto = {
      uuid: postUuid,
      dir: 1,
    };
    await request(app.getHttpServer())
      .post("/posts/vote")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
    const response = await request(app.getHttpServer())
      .get(`/posts/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200);
    const now = new RegExp(new Date().toISOString().substring(0, 10));
    expect(response.body.post.modified).toMatch(now);
    expect(response.body.post.edited).toEqual(true);
    expect(response.body.post.up).toEqual(1);
    expect(response.body.post.down).toEqual(0);
    expect(response.body.post.dir).toEqual(1);
  });

  it("should delete the post", async () => {
    const payload: DeletePostRequestDto = { postUuid };
    await request(app.getHttpServer())
      .delete("/posts")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should not find the deleted post", async () => {
    await request(app.getHttpServer())
      .get(`/posts/${postUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(404);
  });
});
