import { Module } from '@nestjs/common';
import { ContactInquiryController } from './contact-inquiry.controller';
import { ContactInquiryService } from './contact-inquiry.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInquiry } from 'src/entities/Contact-inquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInquiry])],
  controllers: [ContactInquiryController],
  providers: [ContactInquiryService],
})
export class ContactInquiryModule {}
