import { Courses, Review } from "../interfaces";
import { baseUrl } from '../config/const'

async function fetchCourses(): Promise<Courses[]> {
  const res = await fetch(`${baseUrl}/courses`);
  const courses = await res.json();
  return courses;
}

async function createCourse(newCourse:Courses): Promise<Courses|null>{
  const res = await fetch(`${baseUrl}/courses`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCourse),
    })
  
  const saveNewCourse: Courses = await res.json();
  if (saveNewCourse.number !== undefined){
    return saveNewCourse;
  }else{
    return null;
  }
}

async function createReview(newReview:Review, courseId:number): Promise<Review|null>{
  const res = await fetch(`${baseUrl}/courses/${courseId}/reviews`, {
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview),
    })
  
  const saveNewReview: Review = await res.json();
  if (saveNewReview.comment !== undefined){
    return saveNewReview;
  }else{
    return null;
  }
}

async function fetchReview(courseId: number): Promise<Review[]> {
  const res = await fetch(`${baseUrl}/courses/${courseId}/reviews`);
  const reviews = await res.json();
  return reviews;
}

const exportObj = {
  fetchCourses,
  createCourse,
  fetchReview,
  createReview,
}

export default exportObj