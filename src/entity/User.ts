import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, Exclusion, OneToOne} from "typeorm";
import {MinLength, IsNotEmpty, IsEmail} from 'class-validator';
import {Post} from './Post';
import {Profile} from './Profile';
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

    @OneToOne(type=>Profile, profile=>profile.user)
    profile:Profile;

    @OneToMany(type=>Post, post=>post.user)
    posts:Post[];
}
