import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';   

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository : Repository<Users>,
  ) {}

  async findByUsername(username: string): Promise<Users | undefined> {
    return this.userRepository.findOneBy({ username });
  }

  async validatePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
