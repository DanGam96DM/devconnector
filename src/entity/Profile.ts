import {Entity, PrimaryGeneratedColumn, Column, Unique, JoinColumn, OneToOne, CreateDateColumn, OneToMany } from "typeorm";
import {User} from './User';
import {Experience} from './Experience';
import {Education} from './Education';
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

    @Column('simple-array')
    skills:string[];

    @Column()
    bio: string;

    @Column()
    status: string;

    @Column()
    githubusername:string;

    @OneToOne(type=>User)
    @JoinColumn()
    user:User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date:string

    @OneToMany(type=>Experience, experience=>experience.profile)
    experiences: Experience[];

    @OneToMany(type=>Education, education=>education.profile)
    educations: Education[];

}