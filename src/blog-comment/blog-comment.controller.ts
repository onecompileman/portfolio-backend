import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { BlogCommentListResponseDto } from './dto/blog-comment-list-response.dto';
import { BlogCommentResponseDto } from './dto/blog-comment-response.dto';
import { ApiPaginationResponse } from 'src/decorators/api-pagination-response.decorator';
import { BlogCommentService } from './blog-comment.service';
import { SkipLimitQueryDto } from 'src/blog/dto/skip-limit-query.dto';
import { InsertBlogCommentDto } from './dto/insert-blog-comment.dto';
import { Public } from 'src/decorators/public.decorator';
import { DeleteResult } from 'typeorm';

@ApiTags('BlogComment')
@Controller('blog-comment')
export class BlogCommentController {
  constructor(private blogCommentService: BlogCommentService) {}
  
  @Public()
  @ApiExtraModels(BlogCommentResponseDto)
  @ApiPaginationResponse(BlogCommentResponseDto)
  @Get(':blogId')
  findAllByBlogId(
    @Param('blogId', ParseIntPipe) blogId: number,
    @Query() { skip, limit }: SkipLimitQueryDto,
  ): Promise<BlogCommentListResponseDto> {
    return this.blogCommentService.findManyByBlogId(blogId, skip, limit);
  }

  @Public()
  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: BlogCommentResponseDto,
  })
  @Post()
  insertBlogComment(
    @Body() insertBlogCommentDto: InsertBlogCommentDto,
  ): Promise<BlogCommentResponseDto> {
    return this.blogCommentService.insertBlogComment(insertBlogCommentDto);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: BlogCommentResponseDto,
  })
  @Delete(':id')
  deleteBlogComment(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return this.blogCommentService.deleteById(id);
  }
}
