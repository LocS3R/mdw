// import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { IsOptional, IsString } from 'class-validator';

// import { IsOptional, IsString } from "class-validator";

export class CreateAlbumImageDto {
  @IsOptional()
  @IsString()
  caption?: string;
}
