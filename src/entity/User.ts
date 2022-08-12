import {Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany, JoinColumn, ManyToOne, Index, OneToOne, AfterLoad} from "typeorm";
import {IsEmail} from "class-validator";

import { School } from './School';
import { UserRole } from './UserRole';
import { StudentType } from './StudentType';
import { MyBaseEntity } from "./myBaseEntity";
import { Exam } from './Exam';
import { Exclude } from "class-transformer";
import { Student } from "./Student";

@Entity()
export class User extends MyBaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length:15, nullable:true})
    @Index({unique:true})
    userName: string;

    @Column({ nullable:true, select:false })
    @Exclude({ toPlainOnly: false })
    password: string;

    @ManyToMany(() => School)
    @JoinTable({name:"school_users_user"})
    schools: School[];

    @ManyToMany(() => UserRole)
    @JoinTable({name:"user_roles"})
    roles: UserRole[];

    @OneToOne(type => Student, student => student.user)
    student: Student;

    roleIds: number[] = [];

    @AfterLoad()
    setRoleIds() {
        if(this.roles) {
            this.roleIds = this.roles.map(r => r.id);
        }
    }
}
