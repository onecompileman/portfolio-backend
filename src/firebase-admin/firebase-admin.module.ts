import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import * as admin from 'firebase-admin';

@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        const firebaseConfig = {
          projectId: process.env['FIREBASE_PROJECT_ID'],
          clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
          privateKey: process.env['FIREBASE_PRIVATE_KEY'].replace(/\\n/g, '\n'), // handle line breaks
          storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
        };

        return admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig),
          storageBucket: firebaseConfig.storageBucket,
        });
      },
    },
    FirebaseStorageService,
  ],
})
export class FirebaseAdminModule {}
