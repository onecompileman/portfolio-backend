import { ApiProperty } from '@nestjs/swagger';

export class BlogCommentResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  comment: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
}
