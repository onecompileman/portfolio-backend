import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl, MinLength } from 'class-validator';

export class InsertBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUrl()
  imageHeaderUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  tags: string;

  @ApiProperty()
  @IsNotEmpty()
  tagClass: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(50)
  content: string;
}
