import { INestApplication } from "@nestjs/common";
import TestUtils from "./test-utils";
import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import CreatePostRequestDto from "../src/posts/dto/create-post-request.dto";
import * as request from "supertest";
import GetUserFeedQueryDto from "../src/feed/dto/get-user-feed-query.dto";
import ToggleChannelMembershipRequestDto from "../src/channels/dto/toggle-channel-membership-request.dto";
import CreateChannelRequestDto from "../src/channels/dto/create-channel-request.dto";
import GetChannelByTextIdParamDto from "../src/channels/dto/get-channel-by-text-id-param.dto";

describe("Feed Module Tests", () => {
  let app: INestApplication;
  let accessToken = "";
  const postUuids: string[] = [];

  beforeAll(async () => {
    app = await TestUtils.initApp();
    await app.init();

    const channelUuid = "ff5958fb-d1be-426b-ab5b-a3302ec803f0";

    // authenticate
    const loginPayload: LogInUserRequestDto = { email: "student@email.com", password: "pass123" };
    const loginResponse = await request(app.getHttpServer()).post("/auth/login").send(loginPayload).expect(201);
    accessToken = loginResponse.body.accessToken;

    // create three posts
    for (const i of Array(3).keys()) {
      const payload: CreatePostRequestDto = {
        channelUuid,
        title: `test ${i}`,
        body: `test post body ${i}`,
      };
      const { body } = await request(app.getHttpServer())
        .post("/posts")
        .set("Authorization", TestUtils.bearer(accessToken))
        .send(payload)
        .expect(201);

      expect(body.uuid).toBeDefined();
      postUuids.push(body.uuid);
    }

    // create the second channel
    const channelPayload: CreateChannelRequestDto = {
      name: "another channel",
      textId: "another",
    };
    await request(app.getHttpServer())
      .post("/channels")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(channelPayload)
      .expect(201);

    // find the second channel
    const findChannelPayload: GetChannelByTextIdParamDto = {
      textId: "another",
    };
    const response = await request(app.getHttpServer())
      .get("/channels/another")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(findChannelPayload)
      .expect(200);
    expect(response.body.uuid).toBeDefined();
    const secondChannelUuid = response.body.uuid;

    // create a post in the second channel but do not join it
    const createPostPayload: CreatePostRequestDto = {
      channelUuid: secondChannelUuid,
      title: "a post in the second channel",
      body: "this is a post in the second channel",
    };
    const { body } = await request(app.getHttpServer())
      .post("/posts")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(createPostPayload)
      .expect(201);
    expect(body.uuid).toBeDefined();
    postUuids.push(body.uuid);

    // join the demo channel
    const payload: ToggleChannelMembershipRequestDto = {
      channelUuid,
      joining: true,
    };
    await request(app.getHttpServer())
      .post("/channels/member")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
  });

  it("should get posts from the feed", async () => {
    const payload: GetUserFeedQueryDto = {
      page: 1,
      after: new Date(),
    };
    const response = await request(app.getHttpServer())
      .get("/feed")
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200);

    expect(response.body.hasMore).toEqual(false);
    expect(response.body.hasNew).toEqual(false);
    expect(response.body.posts).toHaveLength(3);

    expect(response.body.posts[0].uuid).toEqual(postUuids[2]);
    expect(response.body.posts[1].uuid).toEqual(postUuids[1]);
    expect(response.body.posts[2].uuid).toEqual(postUuids[0]);

    expect(response.body.posts).not.toContain(postUuids[3]);
  });
});
