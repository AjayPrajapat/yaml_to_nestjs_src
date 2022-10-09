import { Module } from "@nestjs/common";
// import { CvBuildService } from './cv-build.service';
// import { CvBuildController } from './cv-build.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { CvService } from "./cv/cv.service";
import { CvController } from "./cv/cv.controller";
import { CvSchema } from "./cv/schemas/cv.schema";
import { ProfileService } from "./profile/profile.service";
import { ProfileController } from "./profile/profile.controller";
import { ProfileSchema } from "./profile/schemas/profile.schema";
import { PortfolioService } from "./portfolio/portfolio.service";
import { PortfolioController } from "./portfolio/portfolio.controller";
import { PortfolioSchema } from "./portfolio/schemas/portfolio.schema";
import { TemplateService } from "./template/template.service";
import { TemplateController } from "./template/template.controller";
import { TemplateSchema } from "./template/schemas/template.schema";
import { UserSettingService } from "./user-setting/user-setting.service";
import { UserSettingController } from "./user-setting/user-setting.controller";
import { UserSettingSchema } from "./user-setting/schemas/user-setting.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "Cv", schema: CvSchema },
      { name: "Profile", schema: ProfileSchema },
      { name: "Portfolio", schema: PortfolioSchema },
      { name: "Template", schema: TemplateSchema },
      { name: "User-Setting", schema: UserSettingSchema },
    ]),
  ],
  controllers: [
    CvController,
    ProfileController,
    PortfolioController,
    TemplateController,
    UserSettingController,
  ],
  providers: [
    CvService,
    ProfileService,
    PortfolioService,
    TemplateService,
    UserSettingService,
  ],
})
export class CvBuildModule {}
