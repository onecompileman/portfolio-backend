import { ApiProperty } from "@nestjs/swagger";

export class SkipLimitDto {
    @ApiProperty({
        required: false,
    })
    skip: number;

    @ApiProperty({
        required: false
    })
    limit: number;
}