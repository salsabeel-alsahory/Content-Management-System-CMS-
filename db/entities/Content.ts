import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity } from 'typeorm';
import { Category } from '../entities/Category';
import { Tag } from './Tag';
@Entity()
export class Content extends BaseEntity {
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
