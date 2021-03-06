import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import {User} from './User';
import {Like} from './Like';
import {Comment} from './Comment';
import { IsNotEmpty } from "class-validator";
@Entity()
export class Post{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    text:string;

    @Column()
    name:string;

    @Column()
    avatar:string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date:string

    @ManyToOne(type=>User, user=>user.posts)
    user:User;

    @OneToMany(type=>Like, like=>like.post)
    likes:Like[];

    @OneToMany(type=>Comment, comment=>comment.post)
    comments:Comment[]
}