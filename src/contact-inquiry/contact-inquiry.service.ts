import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInquiry } from 'src/entities/Contact-inquiry.entity';
import { Repository } from 'typeorm';
import { ContactInquiryListDto } from './dto/contact-inquiry-list.dto';
import { InsertContactInquiryDto } from './dto/insert-contact-inquiry.dto';

@Injectable()
export class ContactInquiryService {
  constructor(
    @InjectRepository(ContactInquiry)
    private contactInquiryRepository: Repository<ContactInquiry>,
  ) {}

  async findAll(
    skip: number = 0,
    limit: number = 0,
  ): Promise<ContactInquiryListDto> {
    const [result, total] = await this.contactInquiryRepository.findAndCount({
      take: limit,
      skip,
    });

    return {
      count: total,
      data: result,
      limit,
      skip,
    };
  }

  async insertContactInquiry(insertContactInquiryDto: InsertContactInquiryDto) {
    const newContactInquiry = await this.contactInquiryRepository.create({
        ...insertContactInquiryDto,
        createdAt: new Date()
    });

    return this.contactInquiryRepository.save(newContactInquiry);
  }
}
