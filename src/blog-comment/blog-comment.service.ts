import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogComment } from 'src/entities/Blog-comment.entity';
import { Repository } from 'typeorm';
import { BlogCommentListResponseDto } from './dto/blog-comment-list-response.dto';
import { InsertBlogCommentDto } from './dto/insert-blog-comment.dto';
import { BlogCommentResponseDto } from './dto/blog-comment-response.dto';
import { Blog } from 'src/entities/Blog.entity';

@Injectable()
export class BlogCommentService {
  constructor(
    @InjectRepository(BlogComment)
    private blogCommentRepository: Repository<BlogComment>,
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  async findManyByBlogId(
    blogId: number,
    skip: number = 0,
    limit: number = 10,
  ): Promise<BlogCommentListResponseDto> {
    const [result, total] = await this.blogCommentRepository.findAndCount({
      where: { blog: { id: blogId } },
      take: limit,
      skip,
    });
    return {
      limit,
      skip,
      data: result,
      count: total,
    };
  }

  async insertBlogComment(
    insertBlogCommentDto: InsertBlogCommentDto,
  ): Promise<BlogCommentResponseDto> {
    const blog = await this.blogRepository.findOneBy({
      id: insertBlogCommentDto?.blog.id,
    });
    if (!blog) {
      throw new HttpException('Blog not found', HttpStatus.PARTIAL_CONTENT);
    }
    const newBlogComment = await this.blogCommentRepository.create({
      ...insertBlogCommentDto,
      blog,
    });

    return this.blogCommentRepository.save(newBlogComment);
  }
}
