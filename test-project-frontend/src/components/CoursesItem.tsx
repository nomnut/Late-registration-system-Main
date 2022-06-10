import  React, { useState } from 'react';
import { Courses, Review } from "../interfaces";
import CoursesService from '../services/CourseService'

type CoursesItemProps = {
  courses: Courses,
};

const CoursesItem = (props: CoursesItemProps) => {
  const courses: Courses = props.courses;

  const [reviewVisible, setReviewVisible] = useState<boolean>(false);
  const [reviews, setReviews] = useState<Review[]>([])

  const [newReviewComments, setNewReviewComments] = useState<string>('');
  const [newReviewScore, setnewReviewScore] = useState<number>(1);

  const fetchReviews = () => {
    if(courses.id){
      CoursesService.fetchReview(courses.id)
        .then(reviews => {
          setReviews(reviews);
      })
    }
    
  }

  const toggleReviewVisible = () => {
    if (!reviewVisible) {
      fetchReviews()
      setReviewVisible(true);
    } else {
      setReviewVisible(false);
    }
  }
  
  const newReviewScoreOpt = [1,2,3,4,5]
  const clearNewReviewForm = () => {
    setNewReviewComments('');
    setnewReviewScore(1);
  }

  const handleNewReviewSave = () => {
    if(courses.id){
      const newReview: Review = {
        comment: newReviewComments,
        score: newReviewScore,
        courseId: courses.id,
      };
      
      CoursesService.createReview(newReview, courses.id)
        .then(saveNewReview => {
          if(saveNewReview){
            fetchReviews();
            clearNewReviewForm();
          }
        })
    }
    
  } 

  return (
    <li className='CoursesItem'>
      {courses.id} - {courses.number} - {courses.title}
      <button onClick={toggleReviewVisible}>
        {reviewVisible ? 'hide' : 'show reviews'}
      </button>
      {reviewVisible &&
        (
          <div>
            <ul>
              {reviews.map(reviews => (
                <li>{reviews.comment} / ({reviews.score})</li>
              ))}
              {reviews.length === 0 && (
                  <li>No reviews</li>
                )
              }
            </ul>
            <b>New reviews:</b><br/>
            Comments: <input value={newReviewComments} onChange={(e) => {setNewReviewComments(e.target.value);}}/>
            &nbsp; Score: &nbsp;
            <select value={newReviewScore} onChange={(e) => {setnewReviewScore(parseInt((e.target.value),10))}}>
              {newReviewScoreOpt.map(item => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <button onClick={handleNewReviewSave}>Save</button>
          </div>
        )
      }
    </li>
  );
};

export default CoursesItem;