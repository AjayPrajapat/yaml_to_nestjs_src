import { AllExceptionFilter } from "./filters/all-exception.filter";
import { MongoExceptionFilter } from "./filters/mongo-exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

@Module({
  imports: [MongooseModule, HttpModule],
  exports: [HttpModule, MongooseModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: MongoExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class SharedModule {}
