import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateCourseDto } from 'src/dto/courses.dto';
import { CreateReviewDto } from 'src/dto/review.dto';
import Review from 'src/review/review.entiy';
import Courses from './courses.entity';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor (private coursesService: CoursesService) {}

    @Get()
    async findAll(): Promise<Courses[]> {
        return this.coursesService.findAll();
    }

    @Get(':id')
    async findByID(@Param('id') id: number): Promise<Courses[]> {
        return this.coursesService.findByID(id);
    }

    @Post()
    async create(@Body() createCoursesDto: CreateCourseDto) {
        const newCourses = this.coursesService.createCourse(createCoursesDto);
        return newCourses;
    }

    @Get(':courseId/reviews')
    async findAllReview(@Param('courseId') courseId: number): Promise<Review[]> {
        return this.coursesService.findAllReviews(courseId);
    }

    @Post(':courseId/reviews')
    async createReview(@Param('courseId') courseId: number, @Body() createReviewDto: CreateReviewDto) {
        const newReview = this.coursesService.createReview(createReviewDto);
        return newReview;
    }

    @Delete(':id')
    async deleteCourseByID(@Param('id') id:number) {
        return this.coursesService.removeCourseByID(id);
    }

    @Put(':id')
    async updateCourse(@Param('id') id: number, @Body() updateCourse: CreateCourseDto){
        return this.coursesService.updateUser(id, updateCourse);
    }
}
