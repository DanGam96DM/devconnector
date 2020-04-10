import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import {Post} from './Post';
import { type } from "os";
@Entity()
export class Comment{
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
    date:string;

    @ManyToOne(type=>Post, post=>post.comments)
    post:Post;
}