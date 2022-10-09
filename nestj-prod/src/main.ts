import { configuration } from "./configuration";
import { AppService } from "./app.service";
import { join } from "path";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as fs from "fs";
import * as session from "express-session";

import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.use(cookieParser());
  app.use(compression());
  app.enableCors();
  // app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: "1",
  });
  app.use(
    session({
      secret: "my-secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.useStaticAssets(join(__dirname, "../www"));
  const config = new DocumentBuilder()
    .setTitle("JoblyUp")
    .setDescription("JoblyUp API Documentation")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  console.log(configuration().port);
  SwaggerModule.setup("api/swagger", app, document);
  await app.listen(configuration().port);
}
bootstrap();
