import './App.css';
import MainDashboard from "./MainDashboard.js"
import ClassPage from "./ClassPage.js"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import {db, firebaseApp} from "./firebase.js"
import ClassDashboard from "./ClassDashboard"
import {BrowserRouter, Routes, Route} from "react-router-dom"; 
import {useState} from "react"


function App() {
  const[classIDList, setClassIDList] = useState(); 
  if(!classIDList) {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainDashboard />}/>
            <Route path="/classes" element={<ClassDashboard setClassIDList={setClassIDList}/>}/>
            <Route path="EHr6kPX9zcqwPNPohZD9" element={<ClassPage classID={"EHr6kPX9zcqwPNPohZD9"}/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  else {
    console.log(classIDList);
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<MainDashboard />}/>
            <Route path="/classes" element={<ClassDashboard setClassIDList={setClassIDList}/>}/>
            <Route path="EHr6kPX9zcqwPNPohZD9" element={<ClassPage classID={"EHr6kPX9zcqwPNPohZD9"}/>}/>
            {/* {classIDList.map((ID) => {
                <Route path={ID} element={<ClassPage classID={ID}/>}/>
            })} */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;