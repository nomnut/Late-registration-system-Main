import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Review {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  comment: string;

  @Column()
  score: number;

  @Column()
  courseId:number;
}

export default Review;