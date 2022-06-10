import React, { useState, useEffect } from 'react';

import CoursesItem from '../components/CoursesItem';
import NewCourseForm from '../components/NewCourseForm';
import { Courses } from '../interfaces';
import CourseService from '../services/CourseService'

//Function Components Style

type AppProps = {
  message?: string;
}

const CourseReview = (props: AppProps) => {
  const [courses, setCourses ] = useState<Courses[]>([]);
  const [formVisible, setFromVisible] = useState<boolean>(false);

  const toggleFormVisible = () => {
    setFromVisible(!formVisible);
  }
  /*const [counter, setCounter] = useState<number>(0);

  const incCounter = () => {
    setCounter(counter + 1);
  }*/
  const fetchCourses = () => {
    CourseService.fetchCourses()
      .then(courses => {
        setCourses(courses);
      });
  }
  const handleNewCourseCreate = (course: Courses) => {
    fetchCourses();
  }

  useEffect(() => {
    fetchCourses();
  },[]);

  return (
    <div className='CourseReview'> 
      <ul>
        {courses.map((item) => ( 
          <CoursesItem key={item.id} courses={item} />
        ))}
      </ul>
      <button onClick={toggleFormVisible}>New course</button>
      {formVisible &&
        <div>
          {/* <Navigate to='/login'/> */}
          <NewCourseForm onNewCourseCreate={handleNewCourseCreate}/>
        </div>
      }
      {/* <br />
      Counter = {counter}
      <br />
      <button onClick={incCounter}>Increment</button> */}
    </div>
  );
}

/*
Class Component Style

type AppProps = {
  message?: string;
};
type AppState = {
  counter?: number;
}
class App extends React.Component<AppProps, AppState> {
  state: AppState = {
    counter: 0,
  };

  componentDidMount() {
    fetch('http://localhost:3000/courses')
      .then(res => res.json())
      .then(obj => {
        this.setState({message: obj.message});
      });
  }

  render() {
    return (
      <div>
        {this.props.message ? this.props.message : "Nothing here"} {this.state.message}
      </div>
    );
  }
}
*/

export default CourseReview;
