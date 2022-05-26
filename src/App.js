import './App.css';
// import MainDashboard from "./MainDashboard.js"
import ClassPage from "./ClassPage.js"
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";
import {db, firebaseApp} from "./firebase.js"
import MainDashboard from "./MainDashboard.js"


function App() {

  return (
    <div className="App">
      <MainDashboard />
    </div>
  );
}

export default App;