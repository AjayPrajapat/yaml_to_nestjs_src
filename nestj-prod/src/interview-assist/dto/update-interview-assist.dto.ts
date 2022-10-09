import { PartialType } from "@nestjs/swagger";
import { CreateInterviewAssistDto } from "./create-interview-assist.dto";

export class UpdateInterviewAssistDto extends PartialType(
  CreateInterviewAssistDto
) {}
