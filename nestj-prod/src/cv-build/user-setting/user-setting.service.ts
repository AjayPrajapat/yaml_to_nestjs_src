
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateUserSettingDto } from './dtos/create-user-setting.dto';
// import { UpdateUserSettingDto } from './dtos/update-user-setting.dto';
import { IUserSetting } from './interfaces/user-setting.interface';

@Injectable()
export class UserSettingService {
    constructor(
        @InjectModel('User-Setting') private readonly userSettingModel: Model<IUserSetting>,
    ) { }
    
    async createUserSetting(createUserSettingDto: CreateUserSettingDto): Promise<IUserSetting> {
        const createdUserSetting = await new this.userSettingModel(createUserSettingDto).save();
        return new Promise((resolve) => {
            resolve(createdUserSetting);
        });
    }
    
    async findAllUserSettings(): Promise<IUserSetting[]> {
        const findAllUserSetting = await this.userSettingModel.find();
        return new Promise((resolve) => {
            resolve(findAllUserSetting);
        });
    }
    
    async findOneUserSetting(_id: string): Promise<IUserSetting> {
        const findOneUserSetting = await this.userSettingModel.findOne({_id});
        return new Promise((resolve) => {
            resolve(findOneUserSetting);
        });
    }
    
    async updateUserSetting(
        _id: string,
        createUserSettingDto: CreateUserSettingDto,
    ): Promise<IUserSetting> {
        const updatedUserSetting = await this.userSettingModel.findOneAndUpdate(
            { _id },
            createUserSettingDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedUserSetting);
        });
    }
    
    
    async updateOneUserSetting(
        _id: string,
        createUserSettingDto: CreateUserSettingDto,
    ): Promise<IUserSetting> {
        const updatedUserSetting = await this.userSettingModel.findOneAndUpdate(
            { _id },
            createUserSettingDto,
            { new: true },
        );
        return new Promise((resolve) => {
            resolve(updatedUserSetting);
        });
    }
    
    async deleteOneUserSetting(_id: string): Promise<any> {
        const deletedUserSetting = await this.userSettingModel.deleteOne({_id});
        return new Promise((resolve) => {
            resolve(deletedUserSetting);
        });
    }
}

