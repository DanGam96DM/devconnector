import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, ManyToOne } from "typeorm";
import {MinLength, IsNotEmpty} from 'class-validator';
import {Profile} from './Profile';
import { type } from "os";

@Entity()
export class Education{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    @IsNotEmpty()
    school:string;

    @Column()
    @IsNotEmpty()
    degree:string;

    @Column()
    @IsNotEmpty()
    fieldofstudy:string;

    @Column({type:'timestamp'})
    @IsNotEmpty()
    from:string;

    @Column({type:'timestamp',nullable: true})
    to:string;

    @Column({default:'0', nullable: true})
    current:boolean;

    @Column({nullable: true})
    description:string;

    @ManyToOne(type=>Profile, profile=>profile.educations)
    @IsNotEmpty()
    profile:Profile;
}