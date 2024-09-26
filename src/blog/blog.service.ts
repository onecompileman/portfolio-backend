import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/entities/Blog.entity';
import { ResponseBodyList } from 'src/models/response-body-list.model';
import { DeleteResult, IsNull, Like, Not, Repository } from 'typeorm';
import { BlogListResponseDto } from './dto/blog-list-response.dto';
import { InsertBlogDto } from './dto/insert-blog.dto';
import { BlogResponseDto } from './dto/blog-response.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { BlogTagsResponseDto } from './dto/blog-tags-response.dto';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async blogFindMany(
    skip: number = 0,
    limit: number = 10,
    query: string = '',
    tags: string = '',
    isPublished: boolean = false,
  ): Promise<BlogListResponseDto> {
    const whereClause: any = {};
    if (query) {
      whereClause.content = whereClause.title = Like(`%${query}%`);
    }

    if (tags) {
      whereClause.tags = tags;
    }

    if (isPublished) {
      whereClause.publishDate = Not(IsNull());
    }
    const [result, total] = await this.blogRepository.findAndCount({
      where: whereClause,
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

  async getBlogTags(): Promise<BlogTagsResponseDto> {
    const blogs = await this.blogRepository
      .createQueryBuilder('blog')
      .select('blog.tags')
      .getMany();

    const allTags = blogs.map((blog) => blog.tags).filter((tag) => tag);

    return { tags: Array.from(new Set(allTags)) };
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
