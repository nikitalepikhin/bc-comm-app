import { AppModule } from "../src/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

export default class TestUtils {
  static async initApp() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true }));
    return app;
  }

  static basic(username: string, password: string) {
    return Buffer.from(`${username}:${password}`).toString("base64");
  }

  static bearer(token: string) {
    return `Bearer ${token}`;
  }
}
