import { Injectable } from "@nestjs/common";
import { CreateInterviewAssistDto } from "./dto/create-interview-assist.dto";
import { UpdateInterviewAssistDto } from "./dto/update-interview-assist.dto";

@Injectable()
export class InterviewAssistService {
  create(createInterviewAssistDto: CreateInterviewAssistDto) {
    return "This action adds a new interviewAssist";
  }

  findAll() {
    return `This action returns all interviewAssist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} interviewAssist`;
  }

  update(id: number, updateInterviewAssistDto: UpdateInterviewAssistDto) {
    return `This action updates a #${id} interviewAssist`;
  }

  remove(id: number) {
    return `This action removes a #${id} interviewAssist`;
  }
}
