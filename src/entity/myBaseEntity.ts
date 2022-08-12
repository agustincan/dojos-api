
import { Column, PrimaryColumn, CreateDateColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


export abstract class MyBaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true, select:false})
  isActive: boolean = true;

  @CreateDateColumn({type: "timestamp", select:false})
  createdAt: Timestamp

  @UpdateDateColumn({type: "timestamp", select:false})
  updatedAt: Timestamp

}

export abstract class MyBaseTypeEntity {
  
  @PrimaryColumn()
  id: number;

  @Column({ length:20 })
  name: string;

  @Column({nullable: true, default: true, select:false})
  isActive: boolean;
}