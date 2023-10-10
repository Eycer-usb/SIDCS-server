import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {

    create(images: Array<Express.Multer.File>) {
        return images.map(image => {
            return {
                filename: image.filename,
                path: image.path,
                size: image.size,
                mimetype: image.mimetype
            }
        });
    }

}
