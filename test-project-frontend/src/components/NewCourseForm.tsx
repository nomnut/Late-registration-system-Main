import { Formik, Form, Field, ErrorMessage } from 'formik';
import  React from 'react';
import { Courses } from '../interfaces';
import CourseService from '../services/CourseService'

type NewCourseFormProps = {
  onNewCourseCreate?: (newCourse: Courses) => void,
};

const NewCourseForm = (props: NewCourseFormProps) => {

  return (
    <div>
      <Formik
        initialValues={{ newCourseNumber: '', newCourseTitle: ''}}
        validate={values => {
          const errors: any = {};
          if(values.newCourseTitle === ''){
            errors.newCourseTitle = 'Course title is required.'
          }
          return errors;
        }}
        onSubmit={ (values, action) => {
          const newCourse = {
            number: values.newCourseNumber,
            title: values.newCourseTitle,
          };
          
          CourseService.createCourse(newCourse)
            .then(saveNewCourse => {
              if (saveNewCourse !== null){
                if (props.onNewCourseCreate !== undefined){
                  props.onNewCourseCreate(saveNewCourse);
                }
              }else{
                alert("Save error");
              }
              action.setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            Number: <Field type="input" name="newCourseNumber" />
            <br/>
            Title: <Field type="input" name="newCourseTitle" />
            <ErrorMessage name="newCourseTitle" component="div"/>
            <br/>
            <button disabled={isSubmitting}>Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewCourseForm;