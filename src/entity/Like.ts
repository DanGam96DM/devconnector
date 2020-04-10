import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { IsNotEmpty } from "class-validator";
import {Post} from './Post';
@Entity()

export class Like{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type=>Post, post=>post.likes)
    post: Post;
}