import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/Blog.entity';
import { ResponseBodyList } from 'src/models/response-body-list.model';
import { DeleteResult, IsNull, Not, Repository } from 'typeorm';
import { BlogListResponseDto } from './dto/blog-list-response.dto';
import { InsertBlogDto } from './dto/insert-blog.dto';
import { BlogResponseDto } from './dto/blog-response.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async blogFindMany(
    skip: number = 0,
    limit: number = 10,
    isPublished: boolean = false,
  ): Promise<BlogListResponseDto> {
    const [result, total] = await this.blogRepository.findAndCount({
      where: isPublished ? { publishDate: Not(IsNull()) } : null,
      take: limit,
      skip,
    });
    console.log(result);
    return {
      limit,
      skip,
      data: result,
      count: total,
    };
  }

  async insertBlog(
    blog: InsertBlogDto,
    isPublish: boolean,
  ): Promise<BlogResponseDto> {
    const newBlog = await this.blogRepository.create({
      ...blog,
      createdAt: new Date(),
      views: 0,
      publishDate: isPublish ? new Date() : null,
    });

    return this.blogRepository.save(newBlog);
  }

  findOne(id: number): Promise<BlogResponseDto> {
    return this.blogRepository.findOneBy({ id });
  }

  async updateBlog(
    id: number,
    blog: UpdateBlogDto,
    isPublish: boolean,
  ): Promise<BlogResponseDto> {
    const existingBlog = await this.findOne(id);

    if (!existingBlog) {
      throw new HttpException('Blog to update not found', HttpStatus.NOT_FOUND);
    }

    if (isPublish) {
      existingBlog.publishDate = new Date();
    }

    return this.blogRepository.save({
      ...existingBlog,
      ...blog,
      updatedAt: new Date(),
    });
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.blogRepository.delete({ id });
  }
}
