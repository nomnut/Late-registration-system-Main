import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Review from 'src/review/review.entiy';
import { CoursesController } from './courses.controller';
import Courses from './courses.entity';
import { CoursesService } from './courses.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      username: 'root',
      password: 'password',
      database: 'test_web_db',
      entities: [Courses, Review],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Courses,Review])
  ],
  controllers: [CoursesController],
  providers: [CoursesService]
})
export class CoursesModule {}
