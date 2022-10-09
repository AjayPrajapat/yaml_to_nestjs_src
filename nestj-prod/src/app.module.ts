import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from "./configuration";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./_shared/shared.module";
import { ConfigModule } from "@nestjs/config";
import { RouterModule } from "@nestjs/core";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyReviewModule } from "./company-review/company-review.module";
import { JobSearchModule } from "./job-search/job-search.module";
import { CvBuildModule } from "./cv-build/cv-build.module";
import { InterviewAssistModule } from "./interview-assist/interview-assist.module";
import { TalentAcquireModule } from "./talent-acquire/talent-acquire.module";

@Module({
  imports: [
    RouterModule.register([
      {
        path: "cv-building",
        module: CvBuildModule,
      },
      {
        path: "company-review",
        module: CompanyReviewModule,
      },
      {
        path: "interview-assistance",
        module: InterviewAssistModule,
      },
      {
        path: "job-search",
        module: JobSearchModule,
      },
      {
        path: "talent-acquisition",
        module: TalentAcquireModule,
      },
    ]),
    MongooseModule.forRoot('mongodb://64.227.166.146:25290/temp', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: false,
    //   playground: false,
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //   },
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'godwinekuma',
    //   password: '',
    //   database: 'invoiceapp',
    //   entities: ['dist/**/*.model.js'],
    //   synchronize: false,
    // }),
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
    SharedModule,
    CompanyReviewModule,
    JobSearchModule,
    CvBuildModule,
    InterviewAssistModule,
    TalentAcquireModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
