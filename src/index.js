import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
//import ImportantLinks from './ImportantLinks';
import Error from "./Components/Error";
import EventDashboard from './Components/EventDashboard';
import StudentDirectory from './Components/StudentDirectory';
import TeacherDashboard from './Components/TeacherDashboard';

import { BrowserRouter, Route, Routes } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
   <Routes>
     <Route path="/" element={<App/>}>
      <Route path="teacherdashboard" element={<TeacherDashboard/>}/>
      <Route path="studentdashboard" element={<StudentDirectory/>}/>
      <Route path="events" element={<EventDashboard/>}/>
     </Route>
     <Route path="*" element={<Error />}/>
   </Routes>
  
  </BrowserRouter>,
  root
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
