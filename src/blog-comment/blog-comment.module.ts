import { Module } from '@nestjs/common';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogComment } from 'src/entities/Blog-comment.entity';
import { Blog } from 'src/entities/Blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    BlogComment,
    Blog  
  ])],
  controllers: [BlogCommentController],
  providers: [BlogCommentService]
})
export class BlogCommentModule {}
