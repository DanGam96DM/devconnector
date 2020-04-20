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

    @Column({nullable: true})
    location: string;

    @Column({type:'timestamp'})
    @IsNotEmpty()
    from:string;

    @Column({type:'timestamp', nullable: true})
    to:string;

    @Column({default:'0'})
    @IsNotEmpty()
    current:boolean;

    @Column({nullable: true})
    description:string;

    @ManyToOne(type=>Profile, profile=>profile.experiences)
    @IsNotEmpty()
    profile:Profile;

}