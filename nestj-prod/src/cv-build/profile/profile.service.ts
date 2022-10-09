
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dtos/create-profile.dto';
// import { UpdateProfileDto } from './dtos/update-profile.dto';
import { IProfile } from './interfaces/profile.interface';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel('Profile') private readonly profileModel: Model<IProfile>,
    ) { }
    
    async createProfile(createProfileDto: CreateProfileDto): Promise<IProfile> {
        const createdProfile = await new this.profileModel(createProfileDto).save();
        return new Promise((resolve) => {
            resolve(createdProfile);
        });
    }
    
    async findAllProfiles(): Promise<IProfile[]> {
        const findAllProfile = await this.profileModel.find();
        return new Promise((resolve) => {
            resolve(findAllProfile);
        });
    }
    
    async findOneProfile(_id: string): Promise<IProfile> {
        const findOneProfile = await this.profileModel.findOne({_id});
        return new Promise((resolve) => {
            resolve(findOneProfile);
        });
    }
    
    async updateProfile(
        _id: string,
        createProfileDto: CreateProfileDto,
    ): Promise<IProfile> {
        const updatedProfile = await this.profileModel.findOneAndUpdate(
            { _id },
            createProfileDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedProfile);
        });
    }
    
    
    async updateOneProfile(
        _id: string,
        createProfileDto: CreateProfileDto,
    ): Promise<IProfile> {
        const updatedProfile = await this.profileModel.findOneAndUpdate(
            { _id },
            createProfileDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedProfile);
        });
    }
    
    async deleteOneProfile(_id: string): Promise<any> {
        const deletedProfile = await this.profileModel.deleteOne({_id});
        return new Promise((resolve) => {
            resolve(deletedProfile);
        });
    }
}

