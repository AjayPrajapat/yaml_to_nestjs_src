import { Test, TestingModule } from "@nestjs/testing";
import { InterviewAssistService } from "./interview-assist.service";

describe("InterviewAssistService", () => {
  let service: InterviewAssistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InterviewAssistService],
    }).compile();

    service = module.get<InterviewAssistService>(InterviewAssistService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
