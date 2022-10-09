
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/create-template.dto';
// import { UpdateTemplateDto } from './dtos/update-template.dto';
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';
import { Message } from './../../_shared/constants/messages.constant';
import { ErrorMessage } from './../../_shared/constants/error.constant';
import { IResponse } from './../../_shared/interfaces/response.interface';

@Controller('template')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) { }
    
    @Post()
    async createTemplate(@Body() createTemplateDto: CreateTemplateDto) : Promise<IResponse> {
        const createdTemplate = await this.templateService.createTemplate(
            createTemplateDto,
        );
        
        if (createdTemplate) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, createdTemplate);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,
                {},
            );
        }
    }
    
    @Get()
    async findAllTemplates() : Promise<IResponse> {
        const findAllTemplates = await this.templateService.findAllTemplates();
        
        if (findAllTemplates && findAllTemplates.length > 0) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAllTemplates.length +' records)', findAllTemplates);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Get(':id')
    async findOneTemplate(@Param('id') id: string) : Promise<IResponse> {
        const findOneTemplate = await this.templateService.findOneTemplate(id);
        
        if (findOneTemplate) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOneTemplate);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Put(':id')
    async updateTemplate(@Param('id') id: string, @Body() updateTemplateDto: CreateTemplateDto) : Promise<IResponse> {
        const updatedTemplate = await this.templateService.updateTemplate(id, updateTemplateDto);
        
        if (updatedTemplate) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedTemplate);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    
    @Patch(':id')
    async updateOneTemplate(@Param('id') id: string, @Body() updateTemplateDto: CreateTemplateDto) : Promise<IResponse> {
        const updatedTemplate = await this.templateService.updateOneTemplate(id, updateTemplateDto);
        
        if (updatedTemplate) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedTemplate);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Delete(':id')
    async removeTemplate(@Param('id') id: string) : Promise<IResponse> {
        const deletedTemplate = await this.templateService.deleteOneTemplate(id);
        
        if (deletedTemplate) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deletedTemplate);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
}
