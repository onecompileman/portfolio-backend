import { Module } from '@nestjs/common';
import { FirebaseStorageService } from './firebase-storage.service';
import * as admin from 'firebase-admin';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [FirebaseStorageService],
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        const firebaseConfig = {
          projectId: process.env['FIREBASE_PROJECT_ID'],
          privateKey: process.env['FIREBASE_PRIVATE_KEY'].replace(
            /\\n/g,
            '\n',
          ), // Ensure newlines are replaced correctly
          clientEmail: process.env['FIREBASE_CLIENT_EMAIL'],
        };

        console.log(firebaseConfig)

        return admin.initializeApp({
          credential: admin.credential.cert(firebaseConfig ),
          storageBucket: process.env['FIREBASE_STORAGE_BUCKET'],
        });
      },
    },
    FirebaseStorageService,
  ],
})
export class FirebaseAdminModule {}
