import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, Exclusion} from "typeorm";
import {MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import {Post} from './Post';
@Entity()
@Unique(['email'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name:string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email:string;

    @Column()
    avatar:string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password:string;

    @Column()
    @CreateDateColumn()
    date: Date;

    @OneToMany(type=>Post, post=>post.user)
    posts:Post[];
}
