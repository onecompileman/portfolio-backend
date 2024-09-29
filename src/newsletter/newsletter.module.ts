import { Module } from '@nestjs/common';
import { NewsletterController } from './newsletter.controller';
import { NewsletterService } from './newsletter.service';
import { MailerService } from './mailer/mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Newsletter } from 'src/entities/Newsletter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Newsletter])],
  controllers: [NewsletterController],
  providers: [NewsletterService, MailerService],
  exports: [MailerService]
})
export class NewsletterModule {}
