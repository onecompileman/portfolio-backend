import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class Newsletter {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }
  