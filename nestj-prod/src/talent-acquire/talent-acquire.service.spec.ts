import { Test, TestingModule } from "@nestjs/testing";
import { TalentAcquireService } from "./talent-acquire.service";

describe("TalentAcquireService", () => {
  let service: TalentAcquireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentAcquireService],
    }).compile();

    service = module.get<TalentAcquireService>(TalentAcquireService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
