import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Content } from './Content';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(type => Content, content => content.tags)
  contents: Content[];
}
