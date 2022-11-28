import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import LogInUserRequestDto from "../src/users/dto/log-in-user-request.dto";
import UserDataResponseDto from "../src/users/dto/user-data-response.dto";
import { Role } from "@prisma/client";
import CreateBaseUserRequestDto from "../src/auth/dto/create-base-user-request.dto";
import TestUtils from "./test-utils";
import { CreateTeacherUserRequestDto } from "../src/auth/dto/create-teacher-user-request.dto";
import CreateRepresentativeUserRequestDto from "../src/auth/dto/create-representative-user-request.dto";
import UpdateUserEmailRequestDto from "../src/auth/dto/update-user-email-request.dto";
import UpdateUserEmailResponseDto from "../src/auth/dto/update-user-email-response.dto";
import UpdateUserPasswordRequestDto from "../src/auth/dto/update-user-password-request.dto";

describe("Authentication Module Tests", () => {
  let app: INestApplication;
  let accessToken = "";
  let authCookie = "";

  beforeAll(async () => {
    app = await TestUtils.initApp();
    await app.init();
  });

  it("should log in as an admin", () => {
    const expected: UserDataResponseDto = {
      accessToken: "",
      email: "admin@email.com",
      requestsVerification: false,
      role: Role.ADMIN,
      username: "admin001",
      uuid: "a867ccf0-b9ab-4aff-8e5e-abb9468fe747",
      verified: true,
    };
    const payload: LogInUserRequestDto = { email: "admin@email.com", password: "pass123" };

    return request(app.getHttpServer())
      .post("/auth/login")
      .send(payload)
      .expect(201)
      .expect((res) => {
        accessToken = res.body.accessToken;
        expected.accessToken = accessToken;
        authCookie = res.header["set-cookie"][0];
      })
      .expect(expected);
  });

  it("should sign up an admin ", () => {
    const payload: CreateBaseUserRequestDto = { email: "testadmin@gmail.com", password: "testtest" };
    return request(app.getHttpServer())
      .post("/auth/signup/admin")
      .set("Authorization", `Basic ${TestUtils.basic(process.env.BASIC_USERNAME, process.env.BASIC_PASSWORD)}`)
      .send(payload)
      .expect(201);
  });

  it("should sign up a student", () => {
    const payload: CreateBaseUserRequestDto = { email: "teststudent@gmail.com", password: "testtest" };
    return request(app.getHttpServer()).post("/auth/signup/student").send(payload).expect(201);
  });

  it("should sign up a teacher", () => {
    const payload: CreateTeacherUserRequestDto = {
      email: "teachertest@gmail.com",
      password: "testtest",
      name: "Test Teacher",
      schoolUuid: "3684a6a2-bcbb-40b6-a23c-169f5c8b75b3",
      facultyUuid: "2aaf92c4-1ed1-4ea0-abe6-58637ff082f5",
    };
    return request(app.getHttpServer()).post("/auth/signup/teacher").send(payload).expect(201);
  });

  it("should sign up a representative", () => {
    const payload: CreateRepresentativeUserRequestDto = {
      name: "Test Representative",
      schoolUuid: "3684a6a2-bcbb-40b6-a23c-169f5c8b75b3",
      email: "testrep@gmail.com",
      password: "testtest",
    };
    return request(app.getHttpServer()).post("/auth/signup/representative").send(payload).expect(201);
  });

  it("should refresh the access token", () => {
    const expected: UserDataResponseDto = {
      accessToken: "",
      email: "admin@email.com",
      requestsVerification: false,
      role: Role.ADMIN,
      username: "admin001",
      uuid: "a867ccf0-b9ab-4aff-8e5e-abb9468fe747",
      verified: true,
    };
    return request(app.getHttpServer())
      .post("/auth/refresh")
      .set("Cookie", authCookie)
      .expect(201)
      .expect((res) => {
        accessToken = res.body.accessToken;
        authCookie = res.header["set-cookie"][0];
        expected.accessToken = accessToken;
      })
      .expect(expected);
  });

  it("should update the email", () => {
    const payload: UpdateUserEmailRequestDto = {
      email: "newadminemail@gmail.com",
    };
    const expected: UpdateUserEmailResponseDto = {
      accessToken,
      email: "newadminemail@gmail.com",
    };
    return request(app.getHttpServer())
      .put("/auth/update/email")
      .set("Cookie", authCookie)
      .send(payload)
      .expect(200)
      .expect((res) => {
        accessToken = res.body.accessToken;
        authCookie = res.header["set-cookie"][0];
      })
      .expect(expected);
  });

  it("should update the password", () => {
    const payload: UpdateUserPasswordRequestDto = {
      password: "newpassword",
    };
    return request(app.getHttpServer())
      .put("/auth/update/password")
      .set("Authorization", TestUtils.bearer(accessToken))
      .send(payload)
      .expect(200);
  });

  it("should log the user out", () => {
    return request(app.getHttpServer())
      .post("/auth/logout")
      .set("Authorization", TestUtils.bearer(accessToken))
      .expect(201)
      .expect(() => {
        accessToken = "";
        authCookie = "";
      });
  });

  it("should log the user in and then delete the account", async () => {
    const payload: LogInUserRequestDto = { email: "testadmin@gmail.com", password: "testtest" };
    let token = "";
    await request(app.getHttpServer())
      .post("/auth/login")
      .send(payload)
      .expect(201)
      .expect((res) => {
        token = res.body.accessToken;
      });
    await request(app.getHttpServer()).delete("/auth").set("Authorization", `Bearer ${token}`).expect(200);
  });
});
