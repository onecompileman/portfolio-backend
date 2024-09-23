import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { Public } from 'src/decorators/public.decorator';
import * as bcrypt from 'bcrypt';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @ApiOkResponse()
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
  console.log(await bcrypt.hash('09758271594sV!', 10));

    return this.authService.login(loginDto.username, loginDto.password);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
