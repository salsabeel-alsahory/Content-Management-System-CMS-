import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Content } from './Content';

@Entity('tag')
export class Tag extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToMany(type => Content, content => content.tags)
  contents: Content[];
  
}
