
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { UserSettingService } from './user-setting.service';
import { CreateUserSettingDto } from './dtos/create-user-setting.dto';
// import { UpdateUserSettingDto } from './dtos/update-user-setting.dto';
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';
import { Message } from './../../_shared/constants/messages.constant';
import { ErrorMessage } from './../../_shared/constants/error.constant';
import { IResponse } from './../../_shared/interfaces/response.interface';

@Controller('user-setting')
export class UserSettingController {
    constructor(private readonly userSettingService: UserSettingService) { }
    
    @Post()
    async createUserSetting(@Body() createUserSettingDto: CreateUserSettingDto) : Promise<IResponse> {
        const createdUserSetting = await this.userSettingService.createUserSetting(
            createUserSettingDto,
        );
        
        if (createdUserSetting) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, createdUserSetting);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,
                {},
            );
        }
    }
    
    @Get()
    async findAllUserSettings() : Promise<IResponse> {
        const findAllUserSettings = await this.userSettingService.findAllUserSettings();
        
        if (findAllUserSettings && findAllUserSettings.length > 0) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAllUserSettings.length +' records)', findAllUserSettings);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Get(':id')
    async findOneUserSetting(@Param('id') id: string) : Promise<IResponse> {
        const findOneUserSetting = await this.userSettingService.findOneUserSetting(id);
        
        if (findOneUserSetting) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOneUserSetting);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Put(':id')
    async updateUserSetting(@Param('id') id: string, @Body() updateUserSettingDto: CreateUserSettingDto) : Promise<IResponse> {
        const updatedUserSetting = await this.userSettingService.updateUserSetting(id, updateUserSettingDto);
        
        if (updatedUserSetting) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedUserSetting);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    
    @Patch(':id')
    async updateOneUserSetting(@Param('id') id: string, @Body() updateUserSettingDto: CreateUserSettingDto) : Promise<IResponse> {
        const updatedUserSetting = await this.userSettingService.updateOneUserSetting(id, updateUserSettingDto);
        
        if (updatedUserSetting) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedUserSetting);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Delete(':id')
    async removeUserSetting(@Param('id') id: string) : Promise<IResponse> {
        const deletedUserSetting = await this.userSettingService.deleteOneUserSetting(id);
        
        if (deletedUserSetting) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deletedUserSetting);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
}
