import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {MinLength, IsNotEmpty} from 'class-validator';
import {Post} from './Post';
@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    avatar:string;

    @Column()
    @MinLength(6)
    password:string;

    @Column()
    @CreateDateColumn()
    date: Date;

    @OneToMany(type=>Post, post=>post.user)
    posts:Post[];
}
