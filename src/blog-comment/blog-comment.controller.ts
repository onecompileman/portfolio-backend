import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BlogCommentListResponseDto } from './dto/blog-comment-list-response.dto';
import { BlogCommentResponseDto } from './dto/blog-comment-response.dto';
import { ApiPaginationResponse } from 'src/decorators/api-pagination-response.decorator';
import { BlogCommentService } from './blog-comment.service';
import { SkipLimitDto } from 'src/blog/dto/skip-limit.dto';
import { InsertBlogCommentDto } from './dto/insert-blog-comment.dto';

@ApiTags('BlogComment')
@Controller('blog-comment')
export class BlogCommentController {
  constructor(private blogCommentService: BlogCommentService) {}

  @ApiExtraModels(BlogCommentResponseDto)
  @ApiPaginationResponse(BlogCommentResponseDto)
  @Get(':blogId')
  findAllByBlogId(
    @Param('blogId', ParseIntPipe) blogId: number,
    @Query() { skip, limit }: SkipLimitDto,
  ): Promise<BlogCommentListResponseDto> {
    return this.blogCommentService.findManyByBlogId(blogId, skip, limit);
  }

  @ApiCreatedResponse({
    type: BlogCommentResponseDto,
  })
  @Post()
  insertBlogComment(
    @Body() insertBlogCommentDto: InsertBlogCommentDto,
  ): Promise<BlogCommentResponseDto> {
    return this.blogCommentService.insertBlogComment(insertBlogCommentDto);
  }
}
