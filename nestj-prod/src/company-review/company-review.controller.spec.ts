import { Test, TestingModule } from "@nestjs/testing";
import { CompanyReviewController } from "./company-review.controller";
import { CompanyReviewService } from "./company-review.service";

describe("CompanyReviewController", () => {
  let controller: CompanyReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyReviewController],
      providers: [CompanyReviewService],
    }).compile();

    controller = module.get<CompanyReviewController>(CompanyReviewController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
