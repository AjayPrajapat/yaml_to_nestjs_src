import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { JobSearchService } from "./job-search.service";
import { CreateJobSearchDto } from "./dto/create-job-search.dto";
import { UpdateJobSearchDto } from "./dto/update-job-search.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Job Search")
@Controller()
export class JobSearchController {
  constructor(private readonly jobSearchService: JobSearchService) {}

  @Post()
  create(@Body() createJobSearchDto: CreateJobSearchDto) {
    return this.jobSearchService.create(createJobSearchDto);
  }

  @Get()
  findAll() {
    return this.jobSearchService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobSearchService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateJobSearchDto: UpdateJobSearchDto
  ) {
    return this.jobSearchService.update(+id, updateJobSearchDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobSearchService.remove(+id);
  }
}
