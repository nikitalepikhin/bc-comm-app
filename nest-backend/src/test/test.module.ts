import { Module } from "@nestjs/common";
import { TestController } from "./test.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [TestController],
  imports: [AuthModule],
})
export class TestModule {}
