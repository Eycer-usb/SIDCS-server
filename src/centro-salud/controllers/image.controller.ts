import { Controller, Delete, FileTypeValidator,
    Get, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe,
    Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
    
import { FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from '../services/image.service';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('centro-salud')
export class ImageController {

  constructor(private readonly imageService: ImageService) {}

  @Post('upload-images')
  @UseGuards(JwtAuthGuard)
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

  @Get('uploads/:filename')
  @UseGuards(JwtAuthGuard)
  getUploadedImages(@Param('filename') filename: string, @Res() res: Response) {
    return res.sendFile(filename, { root: './storage/uploads' });
  }

  @Get('storage')
  @UseGuards(JwtAuthGuard)
  getImages(@Query('path') path: string, @Res() res: Response) {
    if (path === undefined) {
      path = '';
    }
    if (path.includes('..')) {
      return res.status(403).send('Forbidden');
    }
    return res.sendFile(path, { root: './storage' });
  }

  @Delete('storage/:filename')
  @UseGuards(JwtAuthGuard)
  deleteUpload(@Param('filename') filename: string) {
    if (filename === undefined) {
      throw new NotFoundException();
    }
    if (filename.includes('..')) {
      throw new NotFoundException();
    }
    return this.imageService.deleteUpload(filename);
  }
}
