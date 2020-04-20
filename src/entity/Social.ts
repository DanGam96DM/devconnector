import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany } from "typeorm";
import {Profile} from './Profile';
@Entity()
export class Social{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    youtube:string;

    @Column()
    twitter:string;

    @Column()
    facebook:string;

    @Column()
    linkedin:string;

    @Column()
    instagram:string;

    @OneToOne(type=>Profile, profile=>profile.social, {
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    profile:Profile;
}

