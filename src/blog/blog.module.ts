import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/entities/Blog.entity';
import { FirebaseAdminModule } from 'src/firebase-admin/firebase-admin.module';
import { RichTextParseService } from './rich-text-parse/rich-text-parse.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    FirebaseAdminModule
  ],
  controllers: [BlogController],
  providers: [BlogService, RichTextParseService]
})
export class BlogModule {}
