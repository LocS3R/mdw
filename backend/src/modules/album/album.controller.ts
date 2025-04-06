import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlbumService } from './album.service';
import { CreateAlbumImageDto } from './dto/create-album-image.dto';
import { UpdateAlbumImageDto } from './dto/update-album-image.dto';
// import { AlbumImage } from './entities/album-image.entity';
import { Express } from 'express';
import { AlbumImage } from 'src/database/entities/album-image.entity';

@Controller('api/album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAlbumImageDto: CreateAlbumImageDto,
  ): Promise<AlbumImage> {
    return this.albumService.create(file, createAlbumImageDto);
  }

  @Get()
  async findAll(): Promise<AlbumImage[]> {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<AlbumImage> {
    return this.albumService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumImageDto: UpdateAlbumImageDto,
  ): Promise<AlbumImage> {
    return this.albumService.update(id, updateAlbumImageDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<{ statusCode: number; message: string }> {
    await this.albumService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Image deleted successfully',
    };
  }

  @Patch('reorder')
  async reorderImages(
    @Body() imageOrders: { id: string; order: number }[],
  ): Promise<AlbumImage[]> {
    return this.albumService.reorderImages(imageOrders);
  }
}
