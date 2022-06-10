import React from 'react';

import {
  BrowserRouter as Router, 
  Routes, 
  Route,
  Link
} from 'react-router-dom';

import './App.css';
import About from './components/About';
import CourseReview from './components/CourseReview';
import LoginForm from './components/LoginForm';

const App = () => {
  return (
    <Router>
      <div className='App'> 
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path='login' element={<LoginForm/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/' element={<CourseReview/>} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;