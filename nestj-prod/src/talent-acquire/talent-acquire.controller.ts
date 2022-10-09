import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TalentAcquireService } from "./talent-acquire.service";
import { CreateTalentAcquireDto } from "./dto/create-talent-acquire.dto";
import { UpdateTalentAcquireDto } from "./dto/update-talent-acquire.dto";

@Controller("talent-acquire")
export class TalentAcquireController {
  constructor(private readonly talentAcquireService: TalentAcquireService) {}

  @Post()
  create(@Body() createTalentAcquireDto: CreateTalentAcquireDto) {
    return this.talentAcquireService.create(createTalentAcquireDto);
  }

  @Get()
  findAll() {
    return this.talentAcquireService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.talentAcquireService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateTalentAcquireDto: UpdateTalentAcquireDto
  ) {
    return this.talentAcquireService.update(+id, updateTalentAcquireDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.talentAcquireService.remove(+id);
  }
}
