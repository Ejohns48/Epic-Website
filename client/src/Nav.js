import './css/App.css';
import { NavLink } from 'react-router-dom';
import React from 'react'

function Nav() {


  return (
    <nav>
        
        <ul className='nav-links'>
            <NavLink to="/"><li>Insert Faculty</li></NavLink>
            <NavLink to="/insertcourse"><li>Insert Course</li></NavLink>
            <NavLink to="/searchcourses"><li>Search Courses</li></NavLink>
            <NavLink to="/emailcourses"><li>E-Mail Courses</li></NavLink>
            <NavLink to="/viewcourseinfo"><li>View Course Information</li></NavLink>
            <NavLink to="/exportcourseinfo"><li>Export Course Info To Excel</li></NavLink>
            <NavLink to="/logout"><li>Log Out</li></NavLink>
        </ul>
    </nav>
  );
}

export default Nav;
