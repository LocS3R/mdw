import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { AlbumImage } from './entities/album-image.entity';
import { CreateAlbumImageDto } from './dto/create-album-image.dto';
import { UpdateAlbumImageDto } from './dto/update-album-image.dto';
import * as fs from 'fs';
import { AlbumImage } from 'src/database/entities/album-image.entity';
// import * as path from 'path';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumImage)
    private albumImageRepository: Repository<AlbumImage>,
  ) {}

  async create(
    file: Express.Multer.File,
    createAlbumImageDto: CreateAlbumImageDto,
  ): Promise<AlbumImage> {
    const maxOrderImgs = await this.albumImageRepository.find({
      order: { order: 'DESC' },
      take: 1, // Retrieve only the top result
    });

    const newOrder = maxOrderImgs.length > 0 ? maxOrderImgs[0].order + 1 : 0;

    const albumImage = this.albumImageRepository.create({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
      caption: createAlbumImageDto.caption || '',
      order: newOrder,
    });

    return this.albumImageRepository.save(albumImage);
  }

  async findAll(): Promise<AlbumImage[]> {
    return this.albumImageRepository.find({
      order: { order: 'ASC' },
    });
  }

  async findOne(id: string): Promise<AlbumImage> {
    const albumImage = await this.albumImageRepository.findOne({
      where: { id },
    });
    if (!albumImage) {
      throw new NotFoundException(`Album image with ID "${id}" not found`);
    }
    return albumImage;
  }

  async update(
    id: string,
    updateAlbumImageDto: UpdateAlbumImageDto,
  ): Promise<AlbumImage> {
    const albumImage = await this.findOne(id);

    if (updateAlbumImageDto.caption !== undefined) {
      albumImage.caption = updateAlbumImageDto.caption;
    }

    if (updateAlbumImageDto.order !== undefined) {
      albumImage.order = updateAlbumImageDto.order;
    }

    return this.albumImageRepository.save(albumImage);
  }

  async remove(id: string): Promise<void> {
    const albumImage = await this.findOne(id);

    // Delete file from storage
    const filePath = albumImage.path;
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await this.albumImageRepository.remove(albumImage);
  }

  async reorderImages(
    imageOrders: { id: string; order: number }[],
  ): Promise<AlbumImage[]> {
    const promises = imageOrders.map(async ({ id, order }) => {
      const image = await this.findOne(id);
      image.order = order;
      return this.albumImageRepository.save(image);
    });

    return Promise.all(promises);
  }
}
