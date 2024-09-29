import { ApiProperty } from '@nestjs/swagger';

export class Newsletter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  email: string;
  @ApiProperty()
  unsubscribe: boolean;
  @ApiProperty()
  createdAt: Date;
}
