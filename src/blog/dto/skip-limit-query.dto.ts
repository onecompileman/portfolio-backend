import { ApiProperty } from "@nestjs/swagger";
import { Type } from 'class-transformer';
import { IsInt, IsString } from "class-validator";

export class SkipLimitQueryDto {
    @ApiProperty({
        required: false,
    })
    @IsInt()
    @Type(() => Number)
    skip: number;

    @ApiProperty({
        required: false
    })
    @IsInt()
    @Type(() => Number)
    limit: number;

    @ApiProperty({
        required: false
    })
    @IsString()
    query: string;
    
    @ApiProperty({
        required: false
    })
    @IsString()
    tags: string;
}