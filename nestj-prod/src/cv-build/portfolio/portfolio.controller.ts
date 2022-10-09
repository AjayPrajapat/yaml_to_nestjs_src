
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
// import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';
import { Message } from './../../_shared/constants/messages.constant';
import { ErrorMessage } from './../../_shared/constants/error.constant';
import { IResponse } from './../../_shared/interfaces/response.interface';

@Controller('portfolio')
export class PortfolioController {
    constructor(private readonly portfolioService: PortfolioService) { }
    
    @Post()
    async createPortfolio(@Body() createPortfolioDto: CreatePortfolioDto) : Promise<IResponse> {
        const createdPortfolio = await this.portfolioService.createPortfolio(
            createPortfolioDto,
        );
        
        if (createdPortfolio) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, createdPortfolio);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,
                {},
            );
        }
    }
    
    @Get()
    async findAllPortfolios() : Promise<IResponse> {
        const findAllPortfolios = await this.portfolioService.findAllPortfolios();
        
        if (findAllPortfolios && findAllPortfolios.length > 0) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAllPortfolios.length +' records)', findAllPortfolios);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Get(':id')
    async findOnePortfolio(@Param('id') id: string) : Promise<IResponse> {
        const findOnePortfolio = await this.portfolioService.findOnePortfolio(id);
        
        if (findOnePortfolio) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOnePortfolio);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Put(':id')
    async updatePortfolio(@Param('id') id: string, @Body() updatePortfolioDto: CreatePortfolioDto) : Promise<IResponse> {
        const updatedPortfolio = await this.portfolioService.updatePortfolio(id, updatePortfolioDto);
        
        if (updatedPortfolio) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedPortfolio);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    
    @Patch(':id')
    async updateOnePortfolio(@Param('id') id: string, @Body() updatePortfolioDto: CreatePortfolioDto) : Promise<IResponse> {
        const updatedPortfolio = await this.portfolioService.updateOnePortfolio(id, updatePortfolioDto);
        
        if (updatedPortfolio) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedPortfolio);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Delete(':id')
    async removePortfolio(@Param('id') id: string) : Promise<IResponse> {
        const deletedPortfolio = await this.portfolioService.deleteOnePortfolio(id);
        
        if (deletedPortfolio) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deletedPortfolio);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
}
