import { MyBaseTypeEntity } from "./myBaseEntity";
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';
import { SchoolType } from './SchoolType';

@Entity()
export class Graduation extends MyBaseTypeEntity {

  @ManyToOne(() => SchoolType)
  @JoinColumn()
  type: SchoolType

  @Column({ length: 50 })
  name: string
  
}