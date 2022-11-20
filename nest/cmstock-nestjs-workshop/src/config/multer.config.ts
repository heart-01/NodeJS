import { extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

// Multer upload options
export const multerOptions = {
  // Storage properties
  storage: diskStorage({
    // Destination storage path details
    destination: (req: any, file: any, done: any) => {
      const uploadPath = 'src/assets/img';
      // Create folder if doesn't exist
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }
      done(null, uploadPath);
    },
    // File modification details
    filename: (req: any, file: any, done: any) => {
      // Calling the callback passing the random name generated with the original extension name
      done(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
  // Enable file size limits
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  // Check the mimetypes to allow for upload
  fileFilter: (req: any, file: any, done: any) => {
    const type = extname(file.originalname);

    if ( type === '.png' || type === '.jpg' || type === '.jpeg' || type === '.gif' ) {
      // Allow storage of file
      done(null, true);
    } else {
      // Reject file
      done(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },
};
