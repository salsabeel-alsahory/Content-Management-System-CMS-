import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Category } from '../entities/Category';
import { Tag } from './Tag';
@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(type => Category, category => category.contents)
  category: Category;

  @ManyToMany(type => Tag)
  @JoinTable()
  tags: Tag[];
}
