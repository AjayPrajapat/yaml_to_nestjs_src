
        import { ApiProperty } from '@nestjs/swagger';
        
        export class CreateTemplateDto {
            
                @ApiProperty()
                cvId: number;
            
                @ApiProperty()
                cvTemplateId: string;
            
                @ApiProperty()
                vCardId: string;
            
                @ApiProperty()
                profileId: string;
            
        }
        
        