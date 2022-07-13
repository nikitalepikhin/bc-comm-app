import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { INestApplication } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle("Communication App Backend API").setVersion("1.0").build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);
  fs.writeFileSync("./openapi.json", JSON.stringify(document));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: {
      key: fs.readFileSync(".cert/cert.key", "utf-8"),
      cert: fs.readFileSync(".cert/cert.pem", "utf-8"),
    },
  });

  app.use(cookieParser());

  app.enableCors({
    origin: "https://commapp.com",
    allowedHeaders: ["Authorization", "Cache-Control", "Content-Type", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  initSwagger(app);
  await app.listen(8443, "commapp.com", () => {
    console.log("Server is running on port 8443");
  });
}
bootstrap();
