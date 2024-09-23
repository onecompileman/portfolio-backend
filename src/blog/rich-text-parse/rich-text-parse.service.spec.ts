import { Test, TestingModule } from '@nestjs/testing';
import { RichTextParseService } from './rich-text-parse.service';

describe('RichTextParseService', () => {
  let service: RichTextParseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RichTextParseService],
    }).compile();

    service = module.get<RichTextParseService>(RichTextParseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
