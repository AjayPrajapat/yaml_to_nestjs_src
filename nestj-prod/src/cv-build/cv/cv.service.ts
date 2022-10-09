
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dtos/create-cv.dto';
// import { UpdateCvDto } from './dtos/update-cv.dto';
import { ICv } from './interfaces/cv.interface';

@Injectable()
export class CvService {
    constructor(
        @InjectModel('Cv') private readonly cvModel: Model<ICv>,
    ) { }
    
    async createCv(createCvDto: CreateCvDto): Promise<ICv> {
        const createdCv = await new this.cvModel(createCvDto).save();
        return new Promise((resolve) => {
            resolve(createdCv);
        });
    }
    
    async findAllCvs(): Promise<ICv[]> {
        const findAllCv = await this.cvModel.find();
        return new Promise((resolve) => {
            resolve(findAllCv);
        });
    }
    
    async findOneCv(_id: string): Promise<ICv> {
        const findOneCv = await this.cvModel.findOne({_id});
        return new Promise((resolve) => {
            resolve(findOneCv);
        });
    }
    
    async updateCv(
        _id: string,
        createCvDto: CreateCvDto,
    ): Promise<ICv> {
        const updatedCv = await this.cvModel.findOneAndUpdate(
            { _id },
            createCvDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedCv);
        });
    }
    
    
    async updateOneCv(
        _id: string,
        createCvDto: CreateCvDto,
    ): Promise<ICv> {
        const updatedCv = await this.cvModel.findOneAndUpdate(
            { _id },
            createCvDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedCv);
        });
    }
    
    async deleteOneCv(_id: string): Promise<any> {
        const deletedCv = await this.cvModel.deleteOne({_id});
        return new Promise((resolve) => {
            resolve(deletedCv);
        });
    }
}

