import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { getFileExtensionFromBase64 } from 'src/common/utils/file-extension-base64.util';
import { FirebaseStorageService } from 'src/firebase-admin/firebase-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RichTextParseService {
  constructor(private firebaseStorageService: FirebaseStorageService) {}

  async handleRichTextUpload(html: string) {
    const $ = cheerio.load(html);

    const images = $('img');

    for (let i = 0; i < images.length; i++) {
      const src = $(images[i]).attr('src');
      if (src && src.startsWith('data:')) {
        const blob = await fetch(src).then((res) => res.blob());
        const fileType = getFileTypeFromBase64(src);
        const fileExtension = getFileExtensionFromBase64(src);
        const fileToUpload = new File(
          [blob],
          `blog-${uuidv4()}.${fileExtension}`,
          { type: fileType },
        );
        const imageUrl =
          await this.firebaseStorageService.uploadFile(fileToUpload);
        $(images[i]).attr('src', imageUrl);
      }
    }

    return $.html();
  }
}
