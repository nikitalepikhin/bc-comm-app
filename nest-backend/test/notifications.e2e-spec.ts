import TestUtils from "./test-utils";
import { INestApplication } from "@nestjs/common";
import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import * as request from "supertest";
import CreatePostRequestDto from "../src/posts/dto/create-post-request.dto";
import CreateCommentRequestDto from "../src/comments/dto/create-comment-request.dto";
import DismissNotificationRequestDto from "../src/notifications/dto/dismiss-notification-request.dto";

describe("Channels Module Tests", () => {
  let app: INestApplication;
  let studentToken = "";
  let teacherToken = "";
  let postUuid = "";
  let commentUuid = "";
  let notificationUuid = "";

  beforeAll(async () => {
    app = await TestUtils.initApp();
    await app.init();

    // log the student in
    const studentPayload: LogInUserRequestDto = { email: "student@email.com", password: "pass123" };
    const studentResponse = await request(app.getHttpServer()).post("/auth/login").send(studentPayload).expect(201);
    studentToken = studentResponse.body.accessToken;

    // log the teacher in
    const teacherPayload: LogInUserRequestDto = { email: "teacher@email.com", password: "pass123" };
    const teacherResponse = await request(app.getHttpServer()).post("/auth/login").send(teacherPayload).expect(201);
    teacherToken = teacherResponse.body.accessToken;

    // student creates a post in the demo channel
    const payload: CreatePostRequestDto = {
      channelUuid: "ff5958fb-d1be-426b-ab5b-a3302ec803f0",
      title: "post title",
      body: "post body",
    };
    const response = await request(app.getHttpServer())
      .post("/posts")
      .set("Authorization", TestUtils.bearer(studentToken))
      .send(payload)
      .expect(201);
    postUuid = response.body.uuid;
  });

  it("should not find any user notifications", async () => {
    const response = await request(app.getHttpServer())
      .get("/notifications")
      .set("Authorization", TestUtils.bearer(studentToken))
      .expect(200);

    expect(response.body.notifications).toHaveLength(0);
  });

  it("should create a comment on teacher's behalf", async () => {
    const payload: CreateCommentRequestDto = {
      postUuid,
      body: "this is a comment",
    };
    const response = await request(app.getHttpServer())
      .post("/comments")
      .set("Authorization", TestUtils.bearer(teacherToken))
      .send(payload)
      .expect(201);
    expect(response.body.uuid).toBeDefined();
    commentUuid = response.body.uuid;
  });

  it("should find a notification", async () => {
    const response = await request(app.getHttpServer())
      .get("/notifications")
      .set("Authorization", TestUtils.bearer(studentToken))
      .expect(200);

    expect(response.body.notifications).toHaveLength(1);
    expect(response.body.notifications[0].commentUuid).toEqual(commentUuid);
    expect(response.body.notifications[0].postUuid).toEqual(postUuid);
    expect(response.body.notifications[0].channelTextId).toEqual("demo");
    expect(response.body.notifications[0].comment).toEqual("this is a comment");
    expect(response.body.notifications[0].author).toEqual("teacher1");
    expect(response.body.notifications[0].type).toEqual("POST");

    notificationUuid = response.body.notifications[0].notificationUuid;
  });

  it("should dismiss a notification", async () => {
    const payload: DismissNotificationRequestDto = { notificationUuid };
    await request(app.getHttpServer())
      .post("/notifications")
      .set("Authorization", TestUtils.bearer(studentToken))
      .send(payload)
      .expect(201);
  });

  it("should not find any new notifications", async () => {
    const response = await request(app.getHttpServer())
      .get("/notifications")
      .set("Authorization", TestUtils.bearer(studentToken))
      .expect(200);

    expect(response.body.notifications).toHaveLength(0);
  });
});
