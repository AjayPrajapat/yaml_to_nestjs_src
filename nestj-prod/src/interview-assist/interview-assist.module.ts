import { Module } from "@nestjs/common";
import { InterviewAssistService } from "./interview-assist.service";
import { InterviewAssistController } from "./interview-assist.controller";

@Module({
  controllers: [InterviewAssistController],
  providers: [InterviewAssistService],
})
export class InterviewAssistModule {}
