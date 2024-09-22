import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { DatabaseModule } from './database.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DatabaseModule, BlogModule, BlogCommentModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
