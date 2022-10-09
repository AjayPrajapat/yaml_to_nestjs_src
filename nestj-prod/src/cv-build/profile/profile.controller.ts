
import { Controller, Get, Post, Body, Put, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
// import { UpdateProfileDto } from './dtos/update-profile.dto';
import { ResponseError, ResponseSuccess } from './../../_shared/dtos/response.dto';
import { Message } from './../../_shared/constants/messages.constant';
import { ErrorMessage } from './../../_shared/constants/error.constant';
import { IResponse } from './../../_shared/interfaces/response.interface';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }
    
    @Post()
    async createProfile(@Body() createProfileDto: CreateProfileDto) : Promise<IResponse> {
        const createdProfile = await this.profileService.createProfile(
            createProfileDto,
        );
        
        if (createdProfile) {
            return new ResponseSuccess(Message.SUCCESSFULLY_CREATED, createdProfile);
        } else {
            return new ResponseError(
                ErrorMessage.NOT_CREATED_SUCCESSFULLY,
                {},
            );
        }
    }
    
    @Get()
    async findAllProfiles() : Promise<IResponse> {
        const findAllProfiles = await this.profileService.findAllProfiles();
        
        if (findAllProfiles && findAllProfiles.length > 0) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND + '('+ findAllProfiles.length +' records)', findAllProfiles);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Get(':id')
    async findOneProfile(@Param('id') id: string) : Promise<IResponse> {
        const findOneProfile = await this.profileService.findOneProfile(id);
        
        if (findOneProfile) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, findOneProfile);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Put(':id')
    async updateProfile(@Param('id') id: string, @Body() updateProfileDto: CreateProfileDto) : Promise<IResponse> {
        const updatedProfile = await this.profileService.updateProfile(id, updateProfileDto);
        
        if (updatedProfile) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedProfile);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    
    @Patch(':id')
    async updateOneProfile(@Param('id') id: string, @Body() updateProfileDto: CreateProfileDto) : Promise<IResponse> {
        const updatedProfile = await this.profileService.updateOneProfile(id, updateProfileDto);
        
        if (updatedProfile) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, updatedProfile);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
    
    @Delete(':id')
    async removeProfile(@Param('id') id: string) : Promise<IResponse> {
        const deletedProfile = await this.profileService.deleteOneProfile(id);
        
        if (deletedProfile) {
            return new ResponseSuccess(Message.SUCCESSFULLY_FOUND, deletedProfile);
        } else {
            return new ResponseError(
                ErrorMessage.NO_RECORDS_FOUND,
                {},
            );
        }
    }
}
