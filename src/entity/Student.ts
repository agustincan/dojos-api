import { Entity, ManyToOne, OneToOne, JoinColumn, Column, OneToMany, ManyToMany, JoinTable, Index, AfterLoad } from 'typeorm';
import { MyBaseEntity } from './myBaseEntity';
import { StudentType } from './StudentType';
import { User } from './User';
import { Exam } from './Exam';
import { IsEmail, IsInt, Min, Max } from 'class-validator';
import { School } from './School';

@Entity()
@Index(["firstName", "lastName"])
export class Student extends MyBaseEntity {
  
  @Column({nullable:true, length:100})
  firstName: string;

  @Column({nullable:true, length:100})
  lastName: string;

  @Column({nullable:true, length:100})
  address: string;

  @Column({nullable:true, type:"int4"})
  addressNumber: number;

  @Column({nullable:true})
  @IsInt()
  @Min(1)
  @Max(100)
  age: number;

  @Column({nullable:true, length:50})
  @IsEmail()
  email: string;

  @ManyToOne(type => StudentType, { nullable: true })
  @JoinColumn()
  type: StudentType

  @OneToMany(type => Exam, exam => exam.student)
  exams: Exam[];

  @OneToOne(type => User, user => user.student)
  @JoinColumn()
  user: User;

  @Column({nullable: true})
  birthDate: Date

  @ManyToMany(() => School)
  @JoinTable({name:"school_students_student"})
  schools: School[];

  @Column({length:200, nullable: true})
  avatar: string;

  // calculados
  fullName: string;
  avatarUrl: string;

  @AfterLoad()
  setFullName() {
      this.fullName = this.lastName  + ', ' + this.firstName;
  }
  @AfterLoad()
    setAvatarUrl() {
        this.avatarUrl = this.avatar ? process.env.PUBLIC_URL + this.avatar : null;
    }
}