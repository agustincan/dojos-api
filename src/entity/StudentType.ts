import { MyBaseTypeEntity } from "./myBaseEntity";
import { Entity } from 'typeorm';

@Entity({name:"student_type"})
export class StudentType extends MyBaseTypeEntity {
}