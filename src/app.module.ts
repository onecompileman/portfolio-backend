import { Module } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigurationModule } from './configuration.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { UserModule } from './user/user.module';
import { FirebaseAdminModule } from './firebase-admin/firebase-admin.module';
import { ConfigModule } from '@nestjs/config';
import { ContactInquiryModule } from './contact-inquiry/contact-inquiry.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { NewsletterModule } from './newsletter/newsletter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, // Time to live (in seconds)
      limit: 40, // Maximum number of requests within the ttl
    }]),
    ConfigurationModule,
    BlogModule,
    BlogCommentModule,
    UserModule,
    FirebaseAdminModule,
    ContactInquiryModule,
    NewsletterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
