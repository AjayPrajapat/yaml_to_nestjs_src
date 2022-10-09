
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
// import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';
import { IPortfolio } from './interfaces/portfolio.interface';

@Injectable()
export class PortfolioService {
    constructor(
        @InjectModel('Portfolio') private readonly portfolioModel: Model<IPortfolio>,
    ) { }
    
    async createPortfolio(createPortfolioDto: CreatePortfolioDto): Promise<IPortfolio> {
        const createdPortfolio = await new this.portfolioModel(createPortfolioDto).save();
        return new Promise((resolve) => {
            resolve(createdPortfolio);
        });
    }
    
    async findAllPortfolios(): Promise<IPortfolio[]> {
        const findAllPortfolio = await this.portfolioModel.find();
        return new Promise((resolve) => {
            resolve(findAllPortfolio);
        });
    }
    
    async findOnePortfolio(_id: string): Promise<IPortfolio> {
        const findOnePortfolio = await this.portfolioModel.findOne({_id});
        return new Promise((resolve) => {
            resolve(findOnePortfolio);
        });
    }
    
    async updatePortfolio(
        _id: string,
        createPortfolioDto: CreatePortfolioDto,
    ): Promise<IPortfolio> {
        const updatedPortfolio = await this.portfolioModel.findOneAndUpdate(
            { _id },
            createPortfolioDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedPortfolio);
        });
    }
    
    
    async updateOnePortfolio(
        _id: string,
        createPortfolioDto: CreatePortfolioDto,
    ): Promise<IPortfolio> {
        const updatedPortfolio = await this.portfolioModel.findOneAndUpdate(
            { _id },
            createPortfolioDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedPortfolio);
        });
    }
    
    async deleteOnePortfolio(_id: string): Promise<any> {
        const deletedPortfolio = await this.portfolioModel.deleteOne({_id});
        return new Promise((resolve) => {
            resolve(deletedPortfolio);
        });
    }
}

