import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ContactInquiryService } from './contact-inquiry.service';
import { ApiPaginationResponse } from 'src/decorators/api-pagination-response.decorator';
import { ContactInquiryResponseDto } from './dto/contact-inquiry-response.dto';
import { Public } from 'src/decorators/public.decorator';
import { SkipLimitDto } from 'src/blog/dto/skip-limit.dto';
import { ContactInquiryListDto } from './dto/contact-inquiry-list.dto';
import { InsertContactInquiryDto } from './dto/insert-contact-inquiry.dto';

@ApiTags('Contact Inquiry')
@Controller('contact-inquiry')
export class ContactInquiryController {

    constructor(
        private contactInquiryService: ContactInquiryService
    ) {}

    @ApiExtraModels(ContactInquiryResponseDto)
    @ApiPaginationResponse(ContactInquiryResponseDto)
    @Public()
    @Get()
    findAll(@Query() skipLimitDto: SkipLimitDto): Promise<ContactInquiryListDto> {
        return this.contactInquiryService.findAll(skipLimitDto.skip, skipLimitDto.limit);
    }

    @ApiPaginationResponse(ContactInquiryResponseDto)
    @Public()
    @Post()
    insert(@Body() insertContactInquiryDto: InsertContactInquiryDto): Promise<ContactInquiryResponseDto> {
        return this.contactInquiryService.insertContactInquiry(insertContactInquiryDto);
    }

}
