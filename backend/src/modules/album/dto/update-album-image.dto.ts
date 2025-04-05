// import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumImageDto } from './create-album-image.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAlbumImageDto extends PartialType(CreateAlbumImageDto) {
  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsString()
  order?: number;
}
