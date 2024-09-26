import { ApiProperty } from "@nestjs/swagger";

export class SkipLimitQueryDto {
    @ApiProperty({
        required: false,
    })
    skip: number;

    @ApiProperty({
        required: false
    })
    limit: number;

    @ApiProperty({
        required: false
    })
    query: string;
    
    @ApiProperty({
        required: false
    })
    tags: string;
}