export interface Courses {
  id?: number;
  number: string;
  title: string;
}

export interface Review {
  id?: number;
  comment: string;
  score: number;
  courseId: number;
}