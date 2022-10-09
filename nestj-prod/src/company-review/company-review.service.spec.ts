import { Test, TestingModule } from "@nestjs/testing";
import { CompanyReviewService } from "./company-review.service";

describe("CompanyReviewService", () => {
  let service: CompanyReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyReviewService],
    }).compile();

    service = module.get<CompanyReviewService>(CompanyReviewService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
