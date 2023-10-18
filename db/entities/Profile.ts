// Profile.js
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BaseEntity } from 'typeorm';
import { User } from './userdb';


@Entity('profiles')
export class Profile extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ length: 255, nullable: false })
    firstName: string

    @Column({ length: 255, nullable: false })
    lastName: string

    @Column({ type: "date", nullable: false })
    dateOfBirth: Date;

    @Column({
        type: 'enum',
        enum: [
            'create_post',
            'edit_user',
            'delete_comment',
            'edit_post',
            'delete_post',
            'publish_post',
            'moderate_comments',
            'edit_category',
            'manage_tags',
            'edit_profile'
        ],
    })
    name:     'create_post' | 'edit_user' | 'delete_comment' | 'edit_post' | 'delete_post' | 'publish_post' | 'moderate_comments' | 'edit_category' | 'manage_tags' | 'edit_profile';

    @OneToOne(() => User, user => user.profile)
    @JoinColumn()
    user: Partial<User>;
}
