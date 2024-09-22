import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SkipLimitDto } from './dto/skip-limit.dto';
import { BlogService } from './blog.service';
import { BlogListResponseDto } from './dto/blog-list-response.dto';
import { ApiPaginationResponse } from 'src/decorators/api-pagination-response.decorator';
import { BlogResponseDto } from './dto/blog-response.dto';
import { InsertBlogDto } from './dto/insert-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @ApiExtraModels(BlogResponseDto)
  @ApiPaginationResponse(BlogResponseDto)
  @Get()
  findAll(
    @Query() { skip, limit }: SkipLimitDto,
  ): Promise<BlogListResponseDto> {
    return this.blogService.blogFindMany(skip, limit);
  }

  @ApiCreatedResponse({
    type: BlogResponseDto,
  })
  @Post()
  insert(
    @Body() inserBlogDto: InsertBlogDto,
    @Query('isPublish', ParseBoolPipe) isPublish: boolean,
  ): Promise<BlogResponseDto> {
    return this.blogService.insertBlog(inserBlogDto, isPublish);
  }

  @ApiOkResponse({
    type: BlogResponseDto,
  })
  @Put(':id')
  updateBlogById(
    @Param('id', ParseIntPipe) id: number,
    @Query('isPublish', ParseBoolPipe) isPublish: boolean,
    @Body() updateBlogDto: UpdateBlogDto,
  ): Promise<BlogResponseDto> {
    return this.blogService.updateBlog(id, updateBlogDto, isPublish);
  }

  @ApiOkResponse()
  @Delete(':id')
  deleteBlogById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.blogService.deleteById(id);
  }

  publi;
}
