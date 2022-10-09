import { Test, TestingModule } from "@nestjs/testing";
import { InterviewAssistController } from "./interview-assist.controller";
import { InterviewAssistService } from "./interview-assist.service";

describe("InterviewAssistController", () => {
  let controller: InterviewAssistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InterviewAssistController],
      providers: [InterviewAssistService],
    }).compile();

    controller = module.get<InterviewAssistController>(
      InterviewAssistController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
