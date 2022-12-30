import './css/App.css';
import Header from './Header';
import Nav from './Nav';
import InsertFaculty from './pages/InsertFaculty';
import InsertCourse from './pages/InsertCourse';
import SearchCourses from './pages/SearchCourses';
import EmailCourses from './pages/EmailCourses';
import ViewCourseInfo from './pages/ViewCourseInfo';
import ExportCourseExcel from './pages/ExportCourseExcel';
import Logout from './pages/Logout';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (    
    <div className="App">      
      <Router>
        <div id='header-nav'>        
        <Header 
          imgsrc="epic.png"
          imgheight= "150em"
          imgwidth= "400em"
          alttext="Logo Image"        
        />
        <Nav  />
        </div>
        <Routes>                 
            <Route path="/" element={<InsertFaculty />} />
            <Route path="/insertcourse" element={<InsertCourse />} />
            <Route path="/searchcourses" element={<SearchCourses />} />
            <Route path="/emailcourses" element={<EmailCourses />} />
            <Route path="/viewcourseinfo" element={<ViewCourseInfo />} />
            <Route path="/exportcourseinfo" element={<ExportCourseExcel />} />
            <Route path="/logout" element={<Logout />} />      
        </Routes> 
      </Router>
    </div>   
  );
}

export default App;
