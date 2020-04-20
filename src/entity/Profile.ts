import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany } from "typeorm";
import {User} from './User';
import {Experience} from './Experience';
import {Education} from './Education';
import {Social} from './Social';
@Entity()

export class Profile {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    company: string;

    @Column()
    website:string;

    @Column()
    location:string;

    @Column('simple-array', {nullable: true})
    skills:string[];

    @Column()
    bio: string;

    @Column({nullable: true})
    status: string;

    @Column()
    githubusername:string;

    @OneToOne(type=>User, user=>user.profile, {
        onDelete:'CASCADE'
    })
    @JoinColumn()
    user:User;

    @OneToOne(type=>Social, social=>social.profile)
    social:Social;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date:string

    @OneToMany(type=>Experience, experience=>experience.profile)
    experiences: Experience[];

    @OneToMany(type=>Education, education=>education.profile)
    educations: Education[];

}