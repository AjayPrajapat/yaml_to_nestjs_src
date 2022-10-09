
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dtos/create-template.dto';
// import { UpdateTemplateDto } from './dtos/update-template.dto';
import { ITemplate } from './interfaces/template.interface';

@Injectable()
export class TemplateService {
    constructor(
        @InjectModel('Template') private readonly templateModel: Model<ITemplate>,
    ) { }
    
    async createTemplate(createTemplateDto: CreateTemplateDto): Promise<ITemplate> {
        const createdTemplate = await new this.templateModel(createTemplateDto).save();
        return new Promise((resolve) => {
            resolve(createdTemplate);
        });
    }
    
    async findAllTemplates(): Promise<ITemplate[]> {
        const findAllTemplate = await this.templateModel.find();
        return new Promise((resolve) => {
            resolve(findAllTemplate);
        });
    }
    
    async findOneTemplate(_id: string): Promise<ITemplate> {
        const findOneTemplate = await this.templateModel.findOne({_id});
        return new Promise((resolve) => {
            resolve(findOneTemplate);
        });
    }
    
    async updateTemplate(
        _id: string,
        createTemplateDto: CreateTemplateDto,
    ): Promise<ITemplate> {
        const updatedTemplate = await this.templateModel.findOneAndUpdate(
            { _id },
            createTemplateDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedTemplate);
        });
    }
    
    
    async updateOneTemplate(
        _id: string,
        createTemplateDto: CreateTemplateDto,
    ): Promise<ITemplate> {
        const updatedTemplate = await this.templateModel.findOneAndUpdate(
            { _id },
            createTemplateDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedTemplate);
        });
    }
    
    async deleteOneTemplate(_id: string): Promise<any> {
        const deletedTemplate = await this.templateModel.deleteOne({_id});
        return new Promise((resolve) => {
            resolve(deletedTemplate);
        });
    }
}

