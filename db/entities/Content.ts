import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, BaseEntity, TableInheritance } from 'typeorm';
import { Category } from '../entities/Category';
import { Tag } from './Tag';
@Entity()
@TableInheritance({ column: { type: "varchar", name: "content_type" } })
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

  @Column({ default: 0 }) // Default value is 0
  likes: number;

  // Custom method to get the content ID
  getContentId() {
    return this.id;
  }
  async like(): Promise<Content> {
    this.likes++;
    await this.save();
    return this;
  }
}

@Entity()
export class Video extends Content {
  // Add properties specific to Video content
  @Column()
  videoUrl: string;


  async like(): Promise<Video> {
    await super.like();
    return this;
  }
}

@Entity()
export class Article extends Content {
  // Add properties specific to Article content
  @Column("text")
  articleContent: string;
  async like(): Promise<Article> {
    await super.like();
    return this;
  }

}
