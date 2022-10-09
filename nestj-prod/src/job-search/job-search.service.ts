import { Injectable } from "@nestjs/common";
import { CreateJobSearchDto } from "./dto/create-job-search.dto";
import { UpdateJobSearchDto } from "./dto/update-job-search.dto";

@Injectable()
export class JobSearchService {
  create(createJobSearchDto: CreateJobSearchDto) {
    return "This action adds a new jobSearch";
  }

  findAll() {
    return `This action returns all jobSearch`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobSearch`;
  }

  update(id: number, updateJobSearchDto: UpdateJobSearchDto) {
    return `This action updates a #${id} jobSearch`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobSearch`;
  }
}
