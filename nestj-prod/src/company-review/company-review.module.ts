import { Module } from "@nestjs/common";
import { CompanyReviewService } from "./company-review.service";
import { CompanyReviewController } from "./company-review.controller";

@Module({
  controllers: [CompanyReviewController],
  providers: [CompanyReviewService],
})
export class CompanyReviewModule {}
