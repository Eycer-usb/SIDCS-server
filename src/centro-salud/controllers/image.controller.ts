import { Controller, FileTypeValidator,
    MaxFileSizeValidator, ParseFilePipe,
    Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
    
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import multer, { diskStorage } from 'multer';
import { join } from 'path';

@Controller('centro-salud')
export class ImageController {

  constructor(private readonly imageService: ImageService) {}

  @Post('upload-images')
  @UseInterceptors(FilesInterceptor('files', undefined,
  {
    storage: diskStorage({
      destination: (req:any, file:any, cb:any) => {
        const path = './storage/uploads';
        cb(null, path);
      },
      filename: (req:any, file:any, cb:any) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${randomName}${file.originalname}`);
      }
    })
  }))

  uploadImages(
          @UploadedFiles(
            new ParseFilePipe({
              validators: [
                new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 2 }),
                new FileTypeValidator({ fileType: 'image' })
              ]
            })
          )
          images: Array<Express.Multer.File>) {
    return this.imageService.create(images);
  }
}
