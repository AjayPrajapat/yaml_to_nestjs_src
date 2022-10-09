import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InterviewAssistService } from "./interview-assist.service";
import { CreateInterviewAssistDto } from "./dto/create-interview-assist.dto";
import { UpdateInterviewAssistDto } from "./dto/update-interview-assist.dto";

@Controller("interview-assist")
export class InterviewAssistController {
  constructor(
    private readonly interviewAssistService: InterviewAssistService
  ) {}

  @Post()
  create(@Body() createInterviewAssistDto: CreateInterviewAssistDto) {
    return this.interviewAssistService.create(createInterviewAssistDto);
  }

  @Get()
  findAll() {
    return this.interviewAssistService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.interviewAssistService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInterviewAssistDto: UpdateInterviewAssistDto
  ) {
    return this.interviewAssistService.update(+id, updateInterviewAssistDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.interviewAssistService.remove(+id);
  }
}
