import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Decorator is placed here, before the class
export class User {
  @PrimaryGeneratedColumn()
  id: number | null;

  @Column()
  username!: string;

  @Column()
  password: string;
}
