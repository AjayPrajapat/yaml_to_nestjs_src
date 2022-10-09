import { PartialType } from "@nestjs/swagger";
import { CreateTalentAcquireDto } from "./create-talent-acquire.dto";

export class UpdateTalentAcquireDto extends PartialType(
  CreateTalentAcquireDto
) {}
