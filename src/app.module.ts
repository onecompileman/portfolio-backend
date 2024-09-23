import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './configuration.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { ConfigModule } from '@nestjs/config';
import { ContactInquiryModule } from './contact-inquiry/contact-inquiry.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ConfigurationModule,
    BlogModule,
    BlogCommentModule,
    UserModule,
    FirebaseAdminModule,
    ContactInquiryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
