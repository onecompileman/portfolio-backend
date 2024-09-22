import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class InsertBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(50)
  content: string;
}
