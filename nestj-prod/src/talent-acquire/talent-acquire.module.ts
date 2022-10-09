import { Module } from "@nestjs/common";
import { TalentAcquireService } from "./talent-acquire.service";
import { TalentAcquireController } from "./talent-acquire.controller";

@Module({
  controllers: [TalentAcquireController],
  providers: [TalentAcquireService],
})
export class TalentAcquireModule {}
