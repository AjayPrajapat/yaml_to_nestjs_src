import { Injectable } from "@nestjs/common";
import { CreateTalentAcquireDto } from "./dto/create-talent-acquire.dto";
import { UpdateTalentAcquireDto } from "./dto/update-talent-acquire.dto";

@Injectable()
export class TalentAcquireService {
  create(createTalentAcquireDto: CreateTalentAcquireDto) {
    return "This action adds a new talentAcquire";
  }

  findAll() {
    return `This action returns all talentAcquire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} talentAcquire`;
  }

  update(id: number, updateTalentAcquireDto: UpdateTalentAcquireDto) {
    return `This action updates a #${id} talentAcquire`;
  }

  remove(id: number) {
    return `This action removes a #${id} talentAcquire`;
  }
}
