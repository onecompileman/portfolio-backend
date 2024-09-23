import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './entities/Blog.entity';
import { BlogComment } from './entities/Blog-comment.entity';
import { Users } from './entities/User.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: process.env['DB_USER_NAME'],
      password: process.env['DB_USER_PASSWORD'],
      database: process.env['DB_NAME'],
      port: +process.env['DB_PORT'],
      entities: [Blog, BlogComment, Users],
      synchronize: false,
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [],
  providers: [
   
  ],
})
export class ConfigurationModule {}
