import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';
// import { AlbumImage } from './entities/album-image.entity';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumImage } from 'src/database/entities/album-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumImage]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads/album',
        filename: (req, file, callback) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          callback(null, uniqueName);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 25 * 1024 * 1024, // 5MB max file size
      },
    }),
  ],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
