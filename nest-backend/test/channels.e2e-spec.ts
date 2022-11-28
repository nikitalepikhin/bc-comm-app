import { INestApplication } from "@nestjs/common";
import TestUtils from "./test-utils";
import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import * as request from "supertest";
import CreateChannelRequestDto from "../src/channels/dto/create-channel-request.dto";
import CheckChannelIdAvailabilityResponseDto from "../src/channels/dto/check-channel-id-availability-response.dto";
import GetChannelByTextIdResponseDto from "../src/channels/dto/get-channel-by-text-id-response.dto";
import UpdateChannelRequestDto from "../src/channels/dto/update-channel-request.dto";
import SearchChannelsQueryDto from "../src/channels/dto/search-channels-query.dto";
import SearchChannelsResponseDto from "../src/channels/dto/search-channels-response.dto";
import ToggleChannelMembershipRequestDto from "../src/channels/dto/toggle-channel-membership-request.dto";

describe("Channels Module Tests", () => {
  let app: INestApplication;
  let accessToken = "";
  let channelUuid = "";

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

  it("should create a channel", () => {
    const payload: CreateChannelRequestDto = {
      name: "test channel",
      textId: "test123",
      description: "description",
    };

    return request(app.getHttpServer())
      .post("/channels")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
  });

  it("should check availability of a channel ID", () => {
    const expected: CheckChannelIdAvailabilityResponseDto = { exists: true };
    return request(app.getHttpServer())
      .get("/channels/new/check/test123")
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200)
      .expect(expected);
  });

  it("should get the channel by a channel ID", () => {
    const expected: Omit<GetChannelByTextIdResponseDto, "created"> & { created: string } = {
      uuid: "",
      textId: "test123",
      name: "test channel",
      description: "description",
      created: "",
      memberCount: 0,
      isMember: false,
      isOwner: true,
      owner: { role: "STUDENT", username: "student0" },
    };
    return request(app.getHttpServer())
      .get("/channels/test123")
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200)
      .expect((res) => {
        expected.uuid = res.body.uuid;
        expected.created = res.body.created;
        channelUuid = expected.uuid;
      })
      .expect(expected);
  });

  it("should update the channel", () => {
    const payload: UpdateChannelRequestDto = {
      name: "test channel new name",
      textId: "test123",
      description: "new description",
      uuid: channelUuid,
      oldTextId: "test123",
    };
    return request(app.getHttpServer())
      .put("/channels")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should search for existing channels", () => {
    const payload: SearchChannelsQueryDto = { value: "demo" };
    const expected: SearchChannelsResponseDto = { channels: [{ text: "Demo Seeded Channel (demo)", value: "demo" }] };
    return request(app.getHttpServer())
      .get("/channels/search")
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200)
      .expect(expected);
  });

  it("should make the user join the channel", () => {
    const payload: ToggleChannelMembershipRequestDto = {
      channelUuid,
      joining: true,
    };
    return request(app.getHttpServer())
      .post("/channels/member")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(201);
  });

  it("should delete the channel", () => {
    return request(app.getHttpServer())
      .delete(`/channels/${channelUuid}`)
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200);
  });

  it("should check availability of a deleted channel ID", () => {
    const expected: CheckChannelIdAvailabilityResponseDto = { exists: false };
    return request(app.getHttpServer())
      .get("/channels/new/check/test123")
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(200)
      .expect(expected);
  });

  it("should search and not find a deleted channel", () => {
    const payload: SearchChannelsQueryDto = { value: "test123" };
    const expected: SearchChannelsResponseDto = { channels: [] };
    return request(app.getHttpServer())
      .get("/channels/search")
      .set("Authorization", TestUtils.bearer(accessToken))
      .query(payload)
      .expect(200)
      .expect(expected);
  });
});
