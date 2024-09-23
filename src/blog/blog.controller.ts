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
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiQuery,
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
import { RichTextParseService } from './rich-text-parse/rich-text-parse.service';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Blogs')
@Controller('blogs')
export class BlogController {
  constructor(
    private blogService: BlogService,
    private richTextParseService: RichTextParseService,
  ) {}

  @Public()
  @ApiPaginationResponse(BlogResponseDto)
  @Get('/published')
  findAllPublished(
    @Query() { skip, limit }: SkipLimitDto,
  ): Promise<BlogListResponseDto> {
    return this.blogService.blogFindMany(skip, limit, true);
  }

  @ApiBearerAuth()
  @ApiExtraModels(BlogResponseDto)
  @ApiPaginationResponse(BlogResponseDto)
  @Get()
  findAll(
    @Query() { skip, limit }: SkipLimitDto,
  ): Promise<BlogListResponseDto> {
    return this.blogService.blogFindMany(skip, limit);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: BlogResponseDto,
  })
  @Post()
  async insert(
    @Body() inserBlogDto: InsertBlogDto,
    @Query('isPublish', ParseBoolPipe) isPublish?: boolean,
  ): Promise<BlogResponseDto> {
    inserBlogDto.content = await this.richTextParseService.handleRichTextUpload(
      inserBlogDto.content,
    );
    return this.blogService.insertBlog(inserBlogDto, isPublish);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: BlogResponseDto,
  })
  @ApiQuery({ name: 'isPublish', required: false })
  @Put(':id')
  async updateBlogById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Query('isPublish', ParseBoolPipe) isPublish?: boolean, 
  ): Promise<BlogResponseDto> {
    updateBlogDto.content =
      await this.richTextParseService.handleRichTextUpload(
        updateBlogDto.content,
      );
    return this.blogService.updateBlog(id, updateBlogDto, isPublish);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @Delete(':id')
  deleteBlogById(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.blogService.deleteById(id);
  }
}
