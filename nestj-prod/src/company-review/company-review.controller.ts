import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CompanyReviewService } from "./company-review.service";
import { CreateCompanyReviewDto } from "./dto/create-company-review.dto";
import { UpdateCompanyReviewDto } from "./dto/update-company-review.dto";

@ApiTags("Company Review")
@Controller()
export class CompanyReviewController {
  constructor(private readonly companyReviewService: CompanyReviewService) {}

  @Post()
  create(@Body() createCompanyReviewDto: CreateCompanyReviewDto) {
    return this.companyReviewService.create(createCompanyReviewDto);
  }

  @Get()
  findAll() {
    return this.companyReviewService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyReviewService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCompanyReviewDto: UpdateCompanyReviewDto
  ) {
    return this.companyReviewService.update(+id, updateCompanyReviewDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyReviewService.remove(+id);
  }
}
