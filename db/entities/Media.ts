import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class Media extends BaseEntity {
  [x: string]: any;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  cover_image: string;

  // @Column("text")
  // images: { link: string }[];
  
  
  @Column({ type: 'text', nullable: true })
      image: string;
      
  @Column({ nullable: true })
  video_link: string;

  @Column({
    type: "enum",
    enum: ["Album", "Video"],
    default: "Album",
  })
  type: string;

  @ManyToMany(() => Tag, (tag) => tag.videos)
  @JoinTable()
  tags: Tag[];
  
  @CreateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
})
createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  updatedAt: Date;

}
