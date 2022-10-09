import { Injectable } from "@nestjs/common";
import { CreateCompanyReviewDto } from "./dto/create-company-review.dto";
import { UpdateCompanyReviewDto } from "./dto/update-company-review.dto";

@Injectable()
export class CompanyReviewService {
  create(createCompanyReviewDto: CreateCompanyReviewDto) {
    return "This action adds a new companyReview";
  }

  findAll() {
    return `This action returns all companyReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companyReview`;
  }

  update(id: number, updateCompanyReviewDto: UpdateCompanyReviewDto) {
    return `This action updates a #${id} companyReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} companyReview`;
  }
}
