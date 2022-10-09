
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dtos/create-cv.dto';
// import { UpdateCvDto } from './dtos/update-cv.dto';
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';
import { Message } from './../../_shared/constants/messages.constant';
import { ErrorMessage } from './../../_shared/constants/error.constant';
import { IResponse } from './../../_shared/interfaces/response.interface';

@Controller('cv')
export class CvController {
    constructor(private readonly cvService: CvService) { }
    
    @Post()
    async createCv(@Body() createCvDto: CreateCvDto) : Promise<IResponse> {
        const createdCv = await this.cvService.createCv(
            createCvDto,
        );
        
        if (createdCv) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, createdCv);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,
                {},
            );
        }
    }
    
    @Get()
    async findAllCvs() : Promise<IResponse> {
        const findAllCvs = await this.cvService.findAllCvs();
        
        if (findAllCvs && findAllCvs.length > 0) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAllCvs.length +' records)', findAllCvs);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Get(':id')
    async findOneCv(@Param('id') id: string) : Promise<IResponse> {
        const findOneCv = await this.cvService.findOneCv(id);
        
        if (findOneCv) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOneCv);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Put(':id')
    async updateCv(@Param('id') id: string, @Body() updateCvDto: CreateCvDto) : Promise<IResponse> {
        const updatedCv = await this.cvService.updateCv(id, updateCvDto);
        
        if (updatedCv) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedCv);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    
    @Patch(':id')
    async updateOneCv(@Param('id') id: string, @Body() updateCvDto: CreateCvDto) : Promise<IResponse> {
        const updatedCv = await this.cvService.updateOneCv(id, updateCvDto);
        
        if (updatedCv) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedCv);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Delete(':id')
    async removeCv(@Param('id') id: string) : Promise<IResponse> {
        const deletedCv = await this.cvService.deleteOneCv(id);
        
        if (deletedCv) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deletedCv);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
}
