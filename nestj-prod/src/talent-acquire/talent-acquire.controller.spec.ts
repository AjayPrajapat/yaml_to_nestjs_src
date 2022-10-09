import { Test, TestingModule } from "@nestjs/testing";
import { TalentAcquireController } from "./talent-acquire.controller";
import { TalentAcquireService } from "./talent-acquire.service";

describe("TalentAcquireController", () => {
  let controller: TalentAcquireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentAcquireController],
      providers: [TalentAcquireService],
    }).compile();

    controller = module.get<TalentAcquireController>(TalentAcquireController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
