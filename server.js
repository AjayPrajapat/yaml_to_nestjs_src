const yaml = require("js-yaml");
// const case = require('case');
const path = require("path");
const fs = require("fs");
const Case = require("case");
var pluralize = require("pluralize");
const { exec } = require("child_process");

const YAML_CONFIG_FILENAME = "./config.yaml";

const config = yaml.load(
  fs.readFileSync(path.join(__dirname, YAML_CONFIG_FILENAME), "utf8")
);

// let controllerBody = "@Controller('" + controllerRoute + "') export class " + controllerClassName + "Controller { constructor(private readonly " + controllerClassName + "Service: " + controllerClassName + "Service) {} }"
console.log(JSON.stringify(config));

class NestJSModuleBuilder {
  config;
  constructor(config, path) {
    this.config = config;
    // console.log(Object.keys(this.schema.controller))
    // console.log(this.schema.module.name);
    // console.log(Object.keys(this.schema.module.controller));
    // console.log(config);
    // console.log(Object.keys(this.config.module.controller))
    this.createBoilerplateModule(
      this.config.module,
      Object.keys(this.config.module.controller),
      config.schema,
      path
    );
  }

  createBoilerplateModule(module, controllers, schema, path) {
    fs.mkdirSync(path + module.name, { recursive: true });
    fs.writeFileSync(
      path + module.name + "/" + module.name + ".module.ts",
      this.createBoilerplateModuleCode(module.name, controllers)
    );
    controllers.forEach((c) => {
      const singularName = Case.kebab(pluralize.singular(c));
      fs.mkdirSync(path + module.name + "/" + singularName + "/dtos", {
        recursive: true,
      });
      fs.mkdirSync(path + module.name + "/" + singularName + "/interfaces", {
        recursive: true,
      });
      fs.mkdirSync(path + module.name + "/" + singularName + "/schemas", {
        recursive: true,
      });
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/dtos/" +
          "create-" +
          singularName +
          ".dto.ts",
        this.createBoilerplateDtoCode(c, schema[c])
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/interfaces/" +
          singularName +
          ".interface.ts",
        this.createBoilerplateInterfaceCode(c, schema[c])
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/schemas/" +
          singularName +
          ".schema.ts",
        this.createBoilerplateSchemaCode(c, schema[c])
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/" +
          singularName +
          ".controller.ts",
        this.createBoilerplateControllerCode(c)
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/" +
          singularName +
          ".controller.spec.ts",
        this.createBoilerplateControllerSpecCode(c)
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/" +
          singularName +
          ".service.ts",
        this.createBoilerplateServiceCode(c)
      );
      fs.writeFileSync(
        path +
          module.name +
          "/" +
          singularName +
          "/" +
          singularName +
          ".service.spec.ts",
        this.createBoilerplateServiceSpecCode(c)
      );
      // console.log(c, this.config.schema[c]);
      // console.log(this.createBoilerplateDtoCode(c, this.config.schema[c]))
    });
  }

  createBoilerplateModuleCode(name = "cv-build", controllers) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    let importControllersPath =
      "\
            import { MongooseModule } from '@nestjs/mongoose';\n\
        ";
    controllers.forEach((element) => {
      element = Case.kebab(pluralize.singular(element));
      importControllersPath +=
        "        import { " +
        Case.pascal(element) +
        "Service } from './" +
        element +
        "/" +
        element +
        ".service';\n";
      importControllersPath +=
        "        import { " +
        Case.pascal(element) +
        "Controller } from './" +
        element +
        "/" +
        element +
        ".controller';\n";
      importControllersPath +=
        "        import { " +
        Case.pascal(element) +
        "Schema } from './" +
        element +
        "/schemas/" +
        element +
        ".schema';\n";
    });
    let importMongooseSchema = "";
    controllers.forEach((element) => {
      element = Case.kebab(pluralize.singular(element));
      importMongooseSchema +=
        "{ name: '" +
        Case.header(pluralize.singular(element)) +
        "', schema: " +
        Case.pascal(element) +
        "Schema },\n";
    });
    let importControllers = "";
    controllers.forEach((element) => {
      element = Case.kebab(pluralize.singular(element));
      importControllers += "" + Case.pascal(element) + "Controller, ";
    });
    let importServices = "";
    controllers.forEach((element) => {
      element = Case.kebab(pluralize.singular(element));
      importServices += "" + Case.pascal(element) + "Service, ";
    });
    console.log(importControllers);
    controllers.forEach;
    return (
      "\n\
import { Module } from '@nestjs/common';\n\
// import { " +
      Case.pascal(name) +
      "Service } from './" +
      name +
      ".service';\n\
// import { " +
      Case.pascal(name) +
      "Controller } from './" +
      name +
      ".controller';\
\n" +
      importControllersPath +
      "\n\
\n\
\n\
@Module({\n\
    imports: [\n\
        MongooseModule.forFeature([\n\
           " +
      importMongooseSchema +
      "\n\
        ]),\n\
    ],\n\
    controllers: [" +
      importControllers +
      "],\n\
    providers: [" +
      importServices +
      "]\n\
})\n\
export class " +
      Case.pascal(name) +
      "Module { }\n\
        "
    );
  }

  createBoilerplateControllerCode(name) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    return (
      "\n\
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';\n\
import { " +
      Case.pascal(name) +
      "Service } from './" +
      name +
      ".service';\n\
import { Create" +
      singularPascalName +
      "Dto } from './dtos/create-" +
      name +
      ".dto';\n\
// import { Update" +
      singularPascalName +
      "Dto } from './dtos/update-" +
      name +
      ".dto';\n\
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';\n\
import { Message } from './../../_shared/constants/messages.constant';\n\
import { ErrorMessage } from './../../_shared/constants/error.constant';\n\
import { IResponse } from './../../_shared/interfaces/response.interface';\n\
\n\
@Controller('" +
      name +
      "')\n\
export class " +
      pascalCaseName +
      "Controller {\n\
    constructor(private readonly " +
      camelCaseName +
      "Service: " +
      pascalCaseName +
      "Service) { }\n\
    \n\
    @Post()\n\
    async create" +
      singularPascalName +
      "(@Body() create" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto) : Promise<IResponse> {\n\
        const created" +
      singularPascalName +
      " = await this." +
      camelCaseName +
      "Service.create" +
      singularPascalName +
      "(\n\
            create" +
      singularPascalName +
      "Dto,\n\
        );\n\
        \n\
        if (created" +
      singularPascalName +
      ") {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, created" +
      singularPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
    \n\
    @Get()\n\
    async findAll" +
      pluralPascalName +
      "() : Promise<IResponse> {\n\
        const findAll" +
      pluralPascalName +
      " = await this." +
      camelCaseName +
      "Service.findAll" +
      pluralPascalName +
      "();\n\
        \n\
        if (findAll" +
      pluralPascalName +
      " && findAll" +
      pluralPascalName +
      ".length > 0) {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAll" +
      pluralPascalName +
      ".length +' records)', findAll" +
      pluralPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NO_RECORDS_FOUND,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
    \n\
    @Get(':id')\n\
    async findOne" +
      singularPascalName +
      "(@Param('id') id: string) : Promise<IResponse> {\n\
        const findOne" +
      singularPascalName +
      " = await this." +
      camelCaseName +
      "Service.findOne" +
      singularPascalName +
      "(id);\n\
        \n\
        if (findOne" +
      singularPascalName +
      ") {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOne" +
      singularPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NO_RECORDS_FOUND,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
    \n\
    @Put(':id')\n\
    async update" +
      singularPascalName +
      "(@Param('id') id: string, @Body() update" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto) : Promise<IResponse> {\n\
        const updated" +
      singularPascalName +
      " = await this." +
      camelCaseName +
      "Service.update" +
      singularPascalName +
      "(id, update" +
      singularPascalName +
      "Dto);\n\
        \n\
        if (updated" +
      singularPascalName +
      ") {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updated" +
      singularPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NO_RECORDS_FOUND,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
    \n\
    \n\
    @Patch(':id')\n\
    async updateOne" +
      singularPascalName +
      "(@Param('id') id: string, @Body() update" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto) : Promise<IResponse> {\n\
        const updated" +
      singularPascalName +
      " = await this." +
      camelCaseName +
      "Service.updateOne" +
      singularPascalName +
      "(id, update" +
      singularPascalName +
      "Dto);\n\
        \n\
        if (updated" +
      singularPascalName +
      ") {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updated" +
      singularPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NO_RECORDS_FOUND,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
    \n\
    @Delete(':id')\n\
    async remove" +
      singularPascalName +
      "(@Param('id') id: string) : Promise<IResponse> {\n\
        const deleted" +
      singularPascalName +
      " = await this." +
      camelCaseName +
      "Service.deleteOne" +
      singularPascalName +
      "(id);\n\
        \n\
        if (deleted" +
      singularPascalName +
      ") {\n\
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deleted" +
      singularPascalName +
      ");\n\
        } else {\n\
            return new ResponseError(\n\
                ErrorMessage.NO_RECORDS_FOUND,\n\
                {},\n\
            );\n\
        }\n\
    }\n\
}\n\
"
    );
  }

  createBoilerplateControllerSpecCode(name) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    return (
      "\n\
import { Test, TestingModule } from '@nestjs/testing';\n\
import { " +
      pascalCaseName +
      "Controller } from './" +
      name +
      ".controller';\n\
import { " +
      pascalCaseName +
      "Service } from './" +
      name +
      ".service';\n\
\n\
describe('" +
      pascalCaseName +
      "Controller', () => {\n\
    let controller: " +
      pascalCaseName +
      "Controller;\n\
    \n\
    beforeEach(async () => {\n\
        const module: TestingModule = await Test.createTestingModule({\n\
            controllers: [" +
      pascalCaseName +
      "Controller],\n\
            providers: [" +
      pascalCaseName +
      "Service],\n\
        }).compile();\n\
        \n\
        controller = module.get < " +
      pascalCaseName +
      "Controller > (" +
      pascalCaseName +
      "Controller);\n\
    });\n\
    \n\
    it('should be defined', () => {\n\
        expect(controller).toBeDefined();\n\
    });\n\
});\n\
\n\
"
    );
  }

  createBoilerplateServiceCode(name) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    return (
      "\n\
import { Model } from 'mongoose';\n\
import { InjectModel } from '@nestjs/mongoose';\n\
import { Injectable } from '@nestjs/common';\n\
import { Create" +
      singularPascalName +
      "Dto } from './dtos/create-" +
      name +
      ".dto';\n\
// import { Update" +
      singularPascalName +
      "Dto } from './dtos/update-" +
      name +
      ".dto';\n\
import { I" +
      singularPascalName +
      " } from './interfaces/" +
      name +
      ".interface';\n\
\n\
@Injectable()\n\
export class " +
      pascalCaseName +
      "Service {\n\
    constructor(\n\
        @InjectModel('" +
      Case.header(pascalCaseName) +
      "') private readonly " +
      singularCamelName +
      "Model: Model<I" +
      singularPascalName +
      ">,\n\
    ) { }\n\
    \n\
    async create" +
      singularPascalName +
      "(create" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto): Promise<I" +
      singularPascalName +
      "> {\n\
        const created" +
      singularPascalName +
      " = await new this." +
      singularCamelName +
      "Model(create" +
      singularPascalName +
      "Dto).save();\n\
        return new Promise((resolve) => {\n\
            resolve(created" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
    \n\
    async findAll" +
      pluralPascalName +
      "(): Promise<I" +
      singularPascalName +
      "[]> {\n\
        const findAll" +
      singularPascalName +
      " = await this." +
      singularCamelName +
      "Model.find();\n\
        return new Promise((resolve) => {\n\
            resolve(findAll" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
    \n\
    async findOne" +
      singularPascalName +
      "(_id: string): Promise<I" +
      singularPascalName +
      "> {\n\
        const findOne" +
      singularPascalName +
      " = await this." +
      singularCamelName +
      "Model.findOne({_id});\n\
        return new Promise((resolve) => {\n\
            resolve(findOne" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
    \n\
    async update" +
      singularPascalName +
      "(\n\
        _id: string,\n\
        create" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto,\n\
    ): Promise<I" +
      singularPascalName +
      "> {\n\
        const updated" +
      singularPascalName +
      " = await this." +
      singularCamelName +
      "Model.findOneAndUpdate(\n\
            { _id },\n\
            create" +
      singularPascalName +
      "Dto,\n\
            { new: true },\n\
        );\n\
        return new Promise((resolve) => {\n\
            resolve(updated" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
    \n\
    \n\
    async updateOne" +
      singularPascalName +
      "(\n\
        _id: string,\n\
        create" +
      singularPascalName +
      "Dto: Create" +
      singularPascalName +
      "Dto,\n\
    ): Promise<I" +
      singularPascalName +
      "> {\n\
        const updated" +
      singularPascalName +
      " = await this." +
      singularCamelName +
      "Model.findOneAndUpdate(\n\
            { _id },\n\
            create" +
      singularPascalName +
      "Dto,\n\
            { new: true },\n\
        );\n\
        return new Promise((resolve) => {\n\
            resolve(updated" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
    \n\
    async deleteOne" +
      singularPascalName +
      "(_id: string): Promise<any> {\n\
        const deleted" +
      singularPascalName +
      " = await this." +
      singularCamelName +
      "Model.deleteOne({_id});\n\
        return new Promise((resolve) => {\n\
            resolve(deleted" +
      singularPascalName +
      ");\n\
        });\n\
    }\n\
}\n\
\n\
"
    );
  }

  createBoilerplateServiceSpecCode(name) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    return (
      "\n\
import { Test, TestingModule } from '@nestjs/testing';\n\
import { " +
      pascalCaseName +
      "Service } from './" +
      name +
      ".service';\n\
describe('" +
      pascalCaseName +
      "Service', () => {\n\
    let service: " +
      pascalCaseName +
      "Service;\n\
    \n\
    beforeEach(async () => {\n\
        const module: TestingModule = await Test.createTestingModule({\n\
            providers: [" +
      pascalCaseName +
      "Service],\n\
        }).compile();\n\
        \n\
        service = module.get < " +
      pascalCaseName +
      "Service > (" +
      pascalCaseName +
      "Service);\n\
    });\n\
    \n\
    it('should be defined', () => {\n\
        expect(service).toBeDefined();\n\
    });\n\
});\n\
\n\
"
    );
  }

  createBoilerplateInterfaceCode(name, schema) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    let properties = "";
    Object.keys(schema).forEach((p) => {
      properties +=
        p +
        ": " +
        (["string", "number", "object"].includes(schema[p])
          ? schema[p]
          : "string") +
        ";\n            ";
    });

    return (
      "\n\
export interface I" +
      singularPascalName +
      " {\n\
    " +
      properties +
      "\n\
}\n\
"
    );
  }

  createBoilerplateSchemaCode(name, schema) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    let properties = "";
    console.log(schema);
    Object.keys(schema).forEach((p) => {
      console.log(schema[p].type);
      if (typeof schema[p] === "string") {
        properties +=
          "\n\
                " + p + ": " + Case.pascal(schema[p]) + ",";
      } else {
        properties +=
          "\n\
        " +
          p +
          ": {\n\
            type: " +
          (["string", "number", "object"].includes(schema[p].type)
            ? Case.pascal(schema[p].type)
            : schema[p].type == "ObjectId"
            ? "mongoose.Schema.Types.ObjectId"
            : "String") +
          ",\n\
            ref: '" +
          Case.header(schema[p].ref) +
          "',\n\
            require: " +
          (schema[p].require || false) +
          ",\n\
            unique: " +
          (schema[p].unique || false) +
          ",\n\
            default: '" +
          (schema[p].default || "") +
          "',\n\
        },\n";
      }
    });

    return (
      "\n\
import * as mongoose from 'mongoose';\n\
export const " +
      singularPascalName +
      "Schema = new mongoose.Schema({\n\
    " +
      properties +
      "\n\
}).set('timestamps', true);\n\
"
    );
  }

  createBoilerplateDtoCode(name, schema) {
    name = Case.kebab(pluralize.singular(name));
    const pascalCaseName = Case.pascal(name);
    const camelCaseName = Case.camel(Case.pascal(name));
    const singularPascalName = pluralize.singular(pascalCaseName);
    const singularCamelName = pluralize.singular(camelCaseName);
    const pluralPascalName = pluralize.plural(pascalCaseName);
    const pluralCamelName = pluralize.plural(camelCaseName);

    let properties = "";
    Object.keys(schema).forEach((p) => {
      properties +=
        "\n\
                @ApiProperty()\n\
                " +
        p +
        ": " +
        (["string", "number", "object"].includes(schema[p])
          ? schema[p]
          : "string") +
        ";\n            ";
      ("\
            ");
    });

    return (
      "\n\
        import { ApiProperty } from '@nestjs/swagger';\n\
        \n\
        export class Create" +
      singularPascalName +
      "Dto {\n\
            " +
      properties +
      "\n\
        }\n\
        \n\
        "
    );
  }
}

const nestModule = new NestJSModuleBuilder(config, "./nestj-prod/src/");
// prettier --write ./nestj-prod/src/**/*.ts
exec("prettier --write ./nestj-prod/src/**/*.ts", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});
console.log(nestModule);
