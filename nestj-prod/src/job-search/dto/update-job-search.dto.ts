import { PartialType } from "@nestjs/swagger";
import { CreateJobSearchDto } from "./create-job-search.dto";

export class UpdateJobSearchDto extends PartialType(CreateJobSearchDto) {}
