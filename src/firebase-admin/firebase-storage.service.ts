import { Injectable, Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';
import { Bucket } from '@google-cloud/storage';

@Injectable()
export class FirebaseStorageService {
  private bucket: Bucket;

  constructor(
    @Inject('FIREBASE_APP') private readonly firebaseApp: admin.app.App,
  ) {
    this.bucket = this.firebaseApp.storage().bucket();
  }

  async uploadFile(file: File): Promise<string> {
    const fileName = `${uuidv4()}-${file.name}`;
    const fileUpload = this.bucket.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.type,
      },
    });

    return new Promise<string>((resolve, reject) => {
      blobStream.on('error', (err) =>
        reject(`Unable to upload file, something went wrong: ${err}`),
      );

      blobStream.on('finish', async () => {
        const publicUrl = `https://storage.googleapis.com/${this.bucket.name}/${fileName}`;
        resolve(publicUrl); // Return the public URL of the file
      });

      blobStream.end(file.arrayBuffer);
    });
  }
}
