import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { base64ToBlob } from 'src/common/utils/base-64-to-blob.util';
import { getFileExtensionFromBase64 } from 'src/common/utils/file-extension-base64.util';
import { getFileTypeFromBase64 } from 'src/common/utils/file-type-base64.util';
import { FirebaseStorageService } from 'src/firebase-admin/firebase-storage.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RichTextParseService {
  constructor(private firebaseStorageService: FirebaseStorageService) {}

  async handleRichTextUpload(html: string) {
    const $ = cheerio.load(html);

    const images = $('img');

    return '';
    // for (let i = 0; i < images.length; i++) {
    //   const src = $(images[i]).attr('src');
    //   if (src && src.startsWith('data:')) {
    //     const fileType = getFileTypeFromBase64(src);
    //     const fileExtension = getFileExtensionFromBase64(src);

    //     const blob = base64ToBlob(src, fileType);
    //     const fileToUpload = new File(
    //       [blob],
    //       `blog-${uuidv4()}.${fileExtension}`,
    //       { type: fileType },
    //     );
    //     const imageUrl =
    //       await this.firebaseStorageService.uploadFile(fileToUpload);
    //     $(images[i]).attr('src', imageUrl);
    //   }
    // }

    // return $.html();
  }
}
