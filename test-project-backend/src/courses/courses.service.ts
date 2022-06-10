import { Injectable } from '@nestjs/common';
import Courses from './courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCourseDto } from 'src/dto/courses.dto';
import Review from 'src/review/review.entiy';
import { CreateReviewDto } from 'src/dto/review.dto';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Courses) 
    private coursesRepository: Repository<Courses>,
    @InjectRepository(Review) 
    private reviewsRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Courses[]> {
    return this.coursesRepository.find();
    /*return [
        {
            id: 'a100', 
            number: '123453', 
            title: 'Computer 1'
        }
    ];*/
  } 

  async findByID(id: number): Promise<Courses[]>{
    return this.coursesRepository.findBy({id: id});
  }

  async createCourse(createCoursesDto: CreateCourseDto){
    return this.coursesRepository.save(createCoursesDto);
  }

  async createReview(createReviewDto: CreateReviewDto){
    return this.reviewsRepository.save(createReviewDto);
  }

  async findAllReviews(courseId: number): Promise<Review[]> {
    return this.reviewsRepository.find({where:{courseId: courseId}});
  }

  async removeCourseByID(id: number){
    return this.coursesRepository.delete(id);
  }

  async updateUser(id: number, updateCourse: CreateCourseDto) {
    return this.coursesRepository.update(id, updateCourse);
  }
  
}
