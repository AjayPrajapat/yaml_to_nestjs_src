
        import { ApiProperty } from '@nestjs/swagger';
        
        export class CreateProfileDto {
            
                @ApiProperty()
                cvId: number;
            
                @ApiProperty()
                cvTemplateId: string;
            
                @ApiProperty()
                vCardId: string;
            
                @ApiProperty()
                profileId: string;
            
        }
        
        