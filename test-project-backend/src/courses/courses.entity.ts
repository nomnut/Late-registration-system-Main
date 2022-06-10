import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Courses {
  @PrimaryGeneratedColumn()
  id?: number;
  
  @Column()
  number: string;
  
  @Column()
  title: string;
}
export default Courses;