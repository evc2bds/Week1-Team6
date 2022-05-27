import './App.css';
import MainDashboard from "./Components/MainDashboard.js"
import ClassDashboard from "./Components/ClassDashboard.js"
import Error from "./Components/Error";
import EventDashboard from './Components/EventDashboard';
import StudentDirectory from './Components/StudentDirectory';
import TeacherDashboard from './Components/TeacherDashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ClassPage from "./Components/ClassPage"
import {useState, useEffect} from "react"
import db from "./firebase.js"
import { collection, getDocs, getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";

function App() {

  const [classIDList, setClassIDList] = useState(); 
  const getIDs = () => {
    const q = collection(db, "classes"); 
    let x = [];
    getDocs(q)
    .then((allDocs) => {
    allDocs.forEach((doc) => {
        x.push(doc.id); 
    })
    setClassIDList(x); 
    }
    )
  }
  useEffect(() => {
    getIDs();
  }, [db])
  console.log(classIDList); 
  if(!classIDList) {
  return (
    <div className="App">
      <BrowserRouter>
   <Routes>
     <Route path="/" exact element={<MainDashboard/>}/>
      <Route path="teacherdashboard" element={<TeacherDashboard/>}/>
      <Route path="studentdashboard" element={<StudentDirectory/>}/>
      <Route path="events" element={<EventDashboard/>}/>
      <Route path="classes" element={<ClassDashboard/>}/>
     <Route path="*" element={<Error />}/>
   </Routes>
   {/* <ClassPage classID={"clNAluBTYeRAfSIj2ZC9"} /> */}
  
  </BrowserRouter>
      
    </div>
  );
  }
  else {
    return (
      <div className="App">
        <BrowserRouter>
     <Routes>
       <Route path="/" exact element={<MainDashboard/>}/>
        <Route path="teacherdashboard" element={<TeacherDashboard/>}/>
        <Route path="studentdashboard" element={<StudentDirectory/>}/>
        <Route path="events" element={<EventDashboard/>}/>
        <Route path="classes" element={<ClassDashboard/>}/>
       <Route path="*" element={<Error />}/>
       {classIDList.map((ID) => <Route path={"classes/"+ID} element={<ClassPage classID={ID}/>}/>)}
     </Routes>
     
    
    </BrowserRouter>
        
      </div>
    );
  }
}

export default App;