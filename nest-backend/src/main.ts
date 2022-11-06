import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { INestApplication, Logger, ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

const logger = new Logger("main.ts");

function initSwagger(app: INestApplication) {
  const config = new DocumentBuilder().setTitle("Communication App API").setVersion("1.0").build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup("api", app, document);
  fs.writeFileSync("./openapi.json", JSON.stringify(document));
  logger.log("Swagger has been initialized.");
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions:
      process.env.ENV === "DEV"
        ? {
            key: fs.readFileSync(process.env.KEY_PATH, "utf-8"),
            cert: fs.readFileSync(process.env.CERT_PATH, "utf-8"),
          }
        : undefined,
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true, whitelist: true }));

  app.enableCors({
    origin: [process.env.CORS_ORIGIN],
    allowedHeaders: ["Authorization", "Cache-Control", "Content-Type", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  if (process.env.ENV === "DEV") {
    initSwagger(app);
  }

  await app.listen(process.env.PORT ?? 8443, () => {
    logger.log(`Running on port ${process.env.PORT ?? 8443}`);
  });
}

bootstrap();
