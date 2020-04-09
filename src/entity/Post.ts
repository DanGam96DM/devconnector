import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany, ManyToOne } from "typeorm";
import {User} from './User';
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

}