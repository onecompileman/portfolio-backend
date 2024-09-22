import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<LoginResponseDto> {
    const user = await this.validateUser(username, password);
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponseDto> {
    const user = await this.userService.findByUsername(username);
    if (
      user &&
      (await this.userService.validatePassword(password, user.password))
    ) {
      const { password, ...result } = user;
      return result; // Return user without the password
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
