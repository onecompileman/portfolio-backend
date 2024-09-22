import { ApiProperty } from '@nestjs/swagger';

export class BlogResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  tags: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  publishDate: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  views: number;
}
