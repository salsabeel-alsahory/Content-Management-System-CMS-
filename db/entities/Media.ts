
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
  
  @Entity()
  export class Media {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    cover_image: string;
  
    @Column("json")
    images: { link: string }[];
  
    @Column({ nullable: true })
    video_link: string;
  
    @Column({
      type: "enum",
      enum: ["Album", "Video"],
      default: "Album",
    })
    type: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  