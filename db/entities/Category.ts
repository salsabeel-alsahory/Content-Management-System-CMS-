import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Content } from './Content';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(type => Content, content => content.category)
  contents: Content[];
}
