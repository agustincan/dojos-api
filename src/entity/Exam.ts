import { Entity, ManyToOne, JoinColumn, Column, Index } from 'typeorm';
import { MyBaseEntity } from "./myBaseEntity";
import { Graduation } from './Graduation';
import { Student } from './Student';

@Entity()
@Index(["student", "graduation"], { unique:true })
export class Exam extends MyBaseEntity {

  @ManyToOne(type => Student, student => student.exams)
  student: Student;

  @ManyToOne(() => Graduation)
  @JoinColumn()
  graduation: Graduation

  @Column({ nullable:true })
  date: Date

  @Column({ nullable:true })
  comment: string
  
  @Column({ nullable:true })
  escuela: string

  @Column({ nullable:true })
  escuela3: string
}