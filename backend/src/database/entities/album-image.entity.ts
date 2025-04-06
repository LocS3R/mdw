import 'reflect-metadata';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('album_images')
export class AlbumImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 255 })
  path: string;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;

  @Column({ type: 'int' })
  size: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  caption: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
