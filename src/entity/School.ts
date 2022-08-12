import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, Index, AfterLoad} from "typeorm";
import { User } from './User';
import { SchoolType } from './SchoolType';
import { Student } from './Student';

@Entity()
@Index(["name", "parent"], {unique:true})
export class School {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:80})
    name: string;

    @Column({length:100, nullable:true})
    address: string;

    @ManyToOne(type => SchoolType)
    @JoinColumn()
    type: SchoolType

    @ManyToOne(type => School, school => school.childrenSchools)
    parent: School;

    @OneToMany(type => School, school => school.parent)
    childrenSchools: School[];

    @ManyToMany(type => User)
    @JoinTable({name: "school_users_user"})
    users: User[];

    @ManyToMany(type => Student)
    @JoinTable({name: "school_students_student"})
    students: Student[];

    @ManyToOne(type => Student, { nullable: true })
    @JoinColumn()
    director: Student

    @Column({length:200, nullable: true})
    avatar: string;

    // calculados
    avatarUrl: string;
    directorName: string;
    chiefInstructor: string;

    @AfterLoad()
    setAvatarUrl() {
        this.avatarUrl = this.avatar ? process.env.PUBLIC_URL + this.avatar : null;
    }

    @AfterLoad()
    setdirectorName() {
        this.directorName = this.director ? this.director.fullName : "";
    }
}