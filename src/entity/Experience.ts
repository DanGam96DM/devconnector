import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, ManyToOne } from "typeorm";
import {MinLength, IsNotEmpty} from 'class-validator';
import {Profile} from './Profile';
import { type } from "os";
@Entity()

export class Experience{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    @IsNotEmpty()
    title:string;

    @Column()
    @IsNotEmpty()
    company:string;

    @Column()
    location: string;

    @Column({type:'timestamp'})
    @IsNotEmpty()
    from:string;

    @Column({type:'timestamp'})
    to:string;

    @Column({default:'0'})
    @IsNotEmpty()
    current:boolean;

    @Column()
    description:string;

    @ManyToOne(type=>Profile, profile=>profile.experiences)
    @IsNotEmpty()
    profile:Profile;

}